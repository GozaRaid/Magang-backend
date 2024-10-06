/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("schedule", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    event_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    event_day: {
      type: "DATE",
      notNull: true,
    },
    start_time: {
      type: "TIME",
      notNull: true,
    },
    end_time: {
      type: "TIME",
      notNull: true,
    },
    event_name: {
      type: "TEXT",
      notNull: true,
    },
    performer_speaker: {
      type: "TEXT",
      notNull: false,
    },
  });

  pgm.createConstraint(
    "schedule",
    "fk_schedule.event_id_events.id",
    "FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("schedule");
};
