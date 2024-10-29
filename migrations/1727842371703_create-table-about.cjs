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
  pgm.createTable("about", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    aboutDescription: {
      type: "TEXT",
      notNull: true,
    },
    conference_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    where: {
      type: "TEXT",
      notNull: true,
    },
    who: {
      type: "TEXT",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("about");
};
