import pkg from "pg";
import { nanoid } from "nanoid";
const { Pool } = pkg;
import NotFoundError from "../../exceptions/NotFoundError.js";

class HeroService {
  constructor() {
    this._pool = new Pool();
  }

  async addHero({ title, city, image_url }) {
    const id = `hero-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO hero VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, title, city, image_url],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError("Failed to update hero");
    }
    return result.rows[0].id;
  }

  async addHeroTitleCity({ title, city, id }) {
    const query = {
      text: "UPDATE hero SET title = $1, city = $2 WHERE id = $3 RETURNING id",
      values: [title, city, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError("Failed to update hero");
    }
    return result.rows[0].id;
  }

  async getHero() {
    const query = {
      text: "SELECT * FROM hero",
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Hero data not found");
    }
    return result.rows;
  }

  async deleteHero() {
    const query = {
      text: "DELETE FROM hero",
    };
    await this._pool.query(query);
  }
}

export default HeroService;
