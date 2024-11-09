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
      // console.log(date);

      for (const item of items) {
        const id = `schedule-${nanoid(16)}`;
        const { timestart, timeend, title, speakers, parallelsession } = item;

        const startTime = convertToTime(timestart);
        const endTime = convertToTime(timeend);
        const query = {
          text: "INSERT INTO schedule (id, eventday, timestart, timeend, sessiontitle, performer_speaker, parallelsession) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
          values: [
            id,
            date,
            startTime,
            endTime,
            title,
            speakers,
            parallelsession,
          ],
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
    const query = "SELECT * FROM schedule";
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Schedule data not found");
    }

    const schedule = result.rows.reduce((acc, row) => {
      const newdate = new Date(row.eventday);
      newdate.setDate(newdate.getDate() + 1);
      const eventDate = newdate.toISOString().split("T")[0]; // Get YYYY-MM-DD format

      // Find or create a date entry in the schedule
      let dateEntry = acc.find((entry) => entry.date === eventDate);
      if (!dateEntry) {
        dateEntry = { date: eventDate, items: [] };
        acc.push(dateEntry);
      }

      // Format times to 12-hour format with leading zero on hours
      const start = new Date(`1970-01-01T${row.timestart}`);
      const end = new Date(`1970-01-01T${row.timeend}`);

      const formatTime = (time) => {
        const hours = (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format with leading zero
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
        parallelsession: row.parallelsession,
      });

      return acc;
    }, []);

    // Format the final response
    const response = { schedule };
    return response;
  }

  async getScheduleByDate() {
    const query = "SELECT DISTINCT eventday FROM schedule ORDER BY eventday ";
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Schedule data not found");
    }

    return result.rows;
  }

  async deleteSchedule() {
    const query = "DELETE FROM schedule";
    await this._pool.query(query);
  }
}

export default ScheduleService;
