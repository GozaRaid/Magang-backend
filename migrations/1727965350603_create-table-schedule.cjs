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
    eventday: {
      type: "DATE",
      notNull: true,
    },
    timestart: {
      type: "TIME",
      notNull: true,
    },
    timeend: {
      type: "TIME",
      notNull: true,
    },
    sessiontitle: {
      type: "TEXT",
      notNull: true,
    },
    performer_speaker: {
      type: "TEXT",
      notNull: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("schedule");
};
