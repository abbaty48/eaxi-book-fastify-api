export default function (app) {
  return {
    async getTag(name) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(`SELECT name FROM tags WHERE name = $1`, [
          name,
        ]);
      } catch (err) {
        return null;
      } finally {
        connect.release();
      }
    },
    async getTags({ q, order_by, sort, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT name FROM tags ORDER BY ${order_by} ${sort} LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async addTag(name) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`INSERT INTO tags(name) VALUES($1)`, [name]);
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async removeTag(name) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`DELETE FROM tags WHERE name = $1`, [name]);
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
