import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";

class LocationService {
  constructor() {
    this._pool = new Pool();
  }

  async addLocation({ map_url }) {
    const id = `location-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO location VALUES($1, $2) RETURNING id",
      values: [id, map_url],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError("Failed to add location");
    }
    return result.rows[0].id;
  }

  async getLocation() {
    const query = {
      text: "SELECT * FROM location",
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Location data not found");
    }
    return result.rows;
  }

  async deleteLocation() {
    const query = {
      text: "DELETE FROM location",
    };
    await this._pool.query(query);
  }
}

export default LocationService;
