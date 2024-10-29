import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";

class AboutService {
  constructor() {
    this._pool = new Pool();
  }

  async postAbout({ aboutDescription, conference_id, where, who }) {
    const id = `about-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO about VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [id, aboutDescription, conference_id, where, who],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Failed to add about");
    }

    return result.rows[0].id;
  }

  async getAbout() {
    const queryabout = {
      text: "SELECT * FROM about",
    };

    const result = await this._pool.query(queryabout);

    // Check if there is any data in the 'about' query result
    if (!result.rows.length) {
      throw new NotFoundError("About data not found");
    }

    // Get the first row of the about result
    const aboutData = result.rows[0];

    const queryconference = {
      text: "SELECT title, conference_url FROM conference WHERE conference_group_id = $1",
      values: [aboutData.conference_id],
    };

    const conference = await this._pool.query(queryconference);

    // Return an object that combines about data and conference data
    return {
      id: aboutData.id,
      aboutDescription: aboutData.aboutDescription,
      conferences: conference.rows, // Include the conferences array
      where: aboutData.where,
      who: aboutData.who,
    };
  }

  async deleteAbout() {
    const query = {
      text: "DELETE FROM about",
    };

    await this._pool.query(query);
  }
}

export default AboutService;
