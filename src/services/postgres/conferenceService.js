import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";

export default class ConferenceService {
  constructor() {
    this._pool = new Pool();
  }

  async postConference(conferences) {
    const conference_group_id = `conferencegroup-${nanoid(16)}`; // Generate the shared ID once

    // Map each conference entry to an insert query promise
    const insertPromises = conferences.map(({ title, conference_url }) => {
      const id = `conference-${nanoid(16)}`;
      const query = {
        text: "INSERT INTO conference VALUES($1, $2, $3, $4) RETURNING id",
        values: [id, title, conference_url, conference_group_id],
      };
      return this._pool.query(query); // Return the promise for each query
    });

    // Await all insertions to complete
    const results = await Promise.all(insertPromises);

    // Check if all rows returned an id
    results.forEach((result) => {
      if (!result.rows[0]?.id) {
        throw new InvariantError("Failed to add conference");
      }
    });

    return conference_group_id; // Return the shared conference ID
  }

  async getConference() {
    const query = {
      text: "SELECT * FROM conference",
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Conference data not found");
    }
    return result.rows;
  }

  async deleteConference() {
    const query = {
      text: "DELETE FROM conference",
    };
    await this._pool.query(query);
  }
}
