import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";

class SpeakersService {
  constructor() {
    this._pool = new Pool();
  }

  async addSpeakers({ name, bio, image_url }) {
    const id = `speaker-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO speakers (id, name, bio, image_url) VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, name, bio, image_url],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError("Failed to add speaker");
    }
    return result.rows[0].id;
  }

  async getSpeakers() {
    const query = {
      text: "SELECT id , name , bio, image_url as image FROM speakers",
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Speakers data not found");
    }
    return result.rows;
  }

  async editSpeakersById({ id, name, bio }) {
    const query = {
      text: "UPDATE speakers SET name = $1, bio = $2 WHERE id = $3 RETURNING id",
      values: [name, bio, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Speakers data not found");
    }
    return result.rows[0].id;
  }

  async deleteSpeakersById(id) {
    const query = {
      text: "DELETE FROM speakers WHERE id = $1 RETURNING image_url",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Speakers data not found");
    }
    return result.rows[0].image_url;
  }
}

export default SpeakersService;
