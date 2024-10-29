import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import AuthenticationError from "../../exceptions/AuthenticationError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";
import bcrypt from "bcrypt";

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: "INSERT INTO users (id, username, password) VALUES($1, $2, $3) RETURNING id",
      values: [id, username, hashedPassword],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Failed to add user");
    }
  }

  async verifyNewUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };
    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError("Failed to add user. Username has been used.");
    }
  }

  async getUserById(id) {
    const query = {
      text: "SELECT id, username, email, fullname FROM users WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("User not found");
    }

    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError("Your username or password is wrong");
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Your username or password is wrong");
    }

    return id;
  }
}

export default UsersService;
