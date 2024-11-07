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
  pgm.createType("paper_mode", ["Online", "Offline"]);

  pgm.createTable("paper", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    paperid: {
      type: "TEXT",
      notNull: true,
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    authors: {
      type: "TEXT",
      notNull: true,
    },
    mode: {
      type: "paper_mode",
      notNull: true,
    },
    paper_group_id: {
      type: "VARCHAR(50)",
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
  pgm.dropTable("paper");
  pgm.dropType("paper_mode");
};
