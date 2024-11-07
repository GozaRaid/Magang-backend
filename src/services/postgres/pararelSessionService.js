import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";

class PararelSessionService {
  constructor() {
    this._pool = new Pool();
  }

  async addParalelSession({ parallelSessions }) {
    await this._pool.query("BEGIN");
    for (const parallelSession of parallelSessions) {
      const id = `parallel_session-${nanoid(16)}`;
      const id_paper_group = `paper_group-${nanoid(16)}`;
      const { date, name, papers } = parallelSession;
      for (const paper of papers) {
        const id_paper = `paper-${nanoid(16)}`;
        const { paperId, title, authors, mode } = paper;
        const query = {
          text: "INSERT INTO paper (id, paperId, title, authors, mode, paper_group_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
          values: [id_paper, paperId, title, authors, mode, id_paper_group],
        };
        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
          throw new InvariantError("Failed to add paper");
        }
      }

      const query = {
        text: "INSERT INTO pararelsession (id, date, name, paper_group_id) VALUES($1, $2, $3, $4) RETURNING id",
        values: [id, date, name, id_paper_group],
      };
      const result = await this._pool.query(query);
      if (!result.rows[0].id) {
        throw new InvariantError("Failed to add parallel session");
      }
    }
    await this._pool.query("COMMIT");
  }

  async getParallelSession() {
    // Query the `pararelsession` table for all sessions
    const parallelSessionsData = await this._pool.query(
      `SELECT * FROM pararelsession`
    );

    if (!parallelSessionsData.rows.length) {
      throw new NotFoundError("Parallel session data not found");
    }

    // Query the `paper` table for all papers
    const papersData = await this._pool.query(`SELECT * FROM paper`);

    if (!papersData.rows.length) {
      throw new NotFoundError("Paper data not found");
    }

    // Transform the data into the desired format
    const parallelSessions = parallelSessionsData.rows.map((session) => {
      // Filter papers that match the current session's `paper_group_id`
      const papers = papersData.rows
        .filter((paper) => paper.paper_group_id === session.paper_group_id)
        .map((paper) => ({
          id: paper.id, // Use the actual paper ID from the database
          paperId: paper.paperid,
          title: paper.title,
          authors: paper.authors,
          mode: paper.mode,
        }));

      // Add one day to the session.date
      const date = new Date(session.date);
      date.setDate(date.getDate() + 1);

      return {
        id: session.id, // Use the actual session ID from the database
        date: date.toISOString().split("T")[0],
        name: session.name,
        papers,
      };
    });

    return { parallelSessions };
  }

  async deletePararelSession() {
    const query = "DELETE FROM pararelsession";
    await this._pool.query(query);
    const query2 = "DELETE FROM paper";
    await this._pool.query(query2);
  }
}

export default PararelSessionService;
