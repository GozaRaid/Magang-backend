import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

export default class Seeder {
  constructor() {
    this._pool = new Pool();
  }

  async seedUser() {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash("secret", 10);
    await this._pool.query(
      `INSERT INTO users (id, username, password) VALUES ($1, 'admin', $2)`,
      [id, hashedPassword]
    );
    console.log("User seeded successfully.");
  }

  async seedHero() {
    const id = `hero-${nanoid(16)}`;
    await this._pool.query(
      `INSERT INTO hero (id, title, city, image_url) VALUES ($1, 'The 7th International Conference on Data Science and Its Applications', 'Bandung', 'http://localhost:8000/hero/images/ancient-pura.jpg')`,
      [id]
    );
    console.log("Hero seeded successfully.");
  }

  async;

  async destroy() {
    await this._pool.end();
  }
}

// Automatically execute the seeder when running the script
(async () => {
  const seeder = new Seeder();
  try {
    await seeder.seedHero();
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await seeder.destroy();
  }
})();
