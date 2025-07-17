export default function authorDatasource(app) {
  return {
    async getAuthor(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          "SELECT * FROM authors WHERE author_id = $1",
          [id],
        );
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async getAuthors({ q, sort, order_by, page, limit }) {
      console.log(sort, order_by, page, limit);
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM authors
            ORDER BY ${order_by} ${sort}
            LIMIT $1 OFFSET $2
        `,
          [limit, page],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async addAuthor({ name, bio, birth_date, nationality }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          "INSERT INTO authors(name, bio, birth_date, nationality) VALUES($1,$2,$3,$4)",
          [name, bio, birth_date, nationality],
        );
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async updateAuthor({ id, name, bio, birth_date, nationality }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `UPDATE authors
            SET name=$2, bio=$3, birth_date=$4, nationality=$5
            WHERE author_id= $1`,
          [id, name, bio, birth_date, nationality],
        );
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async removeAuthor(id) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query("DELETE FROM authors WHERE author_id = $1", [id]);
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
