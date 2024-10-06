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
  pgm.createTable("speakers", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    event_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    image_url: {
      type: "TEXT",
      notNull: true,
    },
  });

  pgm.addConstraint(
    "speakers",
    "fk_speakers.event_id_events.id",
    "FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("speakers");
};
