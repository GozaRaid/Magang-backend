import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";

class SpeakersService {
  constructor() {
    this._pool = new Pool();
  }

  async addSpeakers({ speakers, image_url }) {
    for (let i = 0; i < speakers.length; i++) {
      const id = `speaker-${nanoid(16)}`;
      const speaker = speakers[i];
      const image = image_url[i];
      const query = {
        text: "INSERT INTO speakers (id, name, bio, image_url) VALUES($1, $2, $3, $4) RETURNING id",
        values: [id, speaker.name, speaker.bio, image],
      };
      const result = await this._pool.query(query);
      if (!result.rows[0].id) {
        throw new InvariantError("Failed to add speaker");
      }
    }
  }

  async getSpeakers() {
    const query = {
      text: "SELECT * FROM speakers",
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Speakers data not found");
    }
    return result.rows;
  }

  async deleteSpeakers() {
    const query = {
      text: "DELETE FROM speakers",
    };
    await this._pool.query(query);
  }
}

export default SpeakersService;
