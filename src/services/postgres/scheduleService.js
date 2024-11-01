import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";
import { convertToTime } from "../../utils/index.js";

class ScheduleService {
  constructor() {
    this._pool = new Pool();
  }

  async addSchedule({ schedule }) {
    await this._pool.query("BEGIN");
    for (const day of schedule) {
      const { date, items } = day;

      for (const item of items) {
        const id = `schedule-${nanoid(16)}`;
        const { timestart, timeend, title, speakers } = item;

        const startTime = convertToTime(timestart);
        const endTime = convertToTime(timeend);
        const query = {
          text: "INSERT INTO schedule (id, eventday, timeStart, timeEnd, sessionTitle, performer_speaker) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
          values: [id, date, startTime, endTime, title, speakers],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
          await this._pool.query("ROLLBACK");
          throw new InvariantError("Failed to add schedule");
        }
      }
    }
    await this._pool.query("COMMIT");
  }

  async getSchedule() {
    const query = "SELECT * FROM schedule ORDER BY eventday, timeStart";
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Schedule data not found");
    }

    const schedule = result.rows.reduce((acc, row) => {
      const eventDate = new Date(row.eventday).toISOString().split("T")[0]; // Get YYYY-MM-DD format

      // Find or create a date entry in the schedule
      let dateEntry = acc.find((entry) => entry.date === eventDate);
      if (!dateEntry) {
        dateEntry = { date: eventDate, items: [] };
        acc.push(dateEntry);
      }

      // Format times to 12-hour format
      const start = new Date(`1970-01-01T${row.timestart}`);
      const end = new Date(`1970-01-01T${row.timeend}`);

      const formatTime = (time) => {
        const hours = time.getHours() % 12 || 12; // Convert to 12-hour format
        const minutes = time.getMinutes().toString().padStart(2, "0"); // Ensure two digits
        const ampm = time.getHours() >= 12 ? "PM" : "AM";
        return `${hours}:${minutes} ${ampm}`;
      };

      // Add the session to the corresponding date entry
      dateEntry.items.push({
        timestart: formatTime(start),
        timeend: formatTime(end),
        title: row.sessiontitle,
        speakers: row.performer_speaker,
      });

      return acc;
    }, []);

    // Format the final response
    const response = { schedule };
    return response;
  }

  async deleteSchedule() {
    const query = "DELETE FROM schedule";
    await this._pool.query(query);
  }
}

export default ScheduleService;
