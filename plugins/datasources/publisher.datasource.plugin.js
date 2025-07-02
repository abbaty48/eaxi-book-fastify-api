export default function publisherDatasource(app) {
  return {
    async getPublisher(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM publishers WHERE publisher_id = $1`,
          [id],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async getPublishers({ q, sort, order_by, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM publishers
          ORDER BY ${order_by} ${sort}
          LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async addPublisher({ name, founded_year, headquarters, website }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `
          INSERT INTO publishers(name, founded_year, headquarters, website)
          VALUES($1,$2,$3,$4)
          `,
          [name, founded_year, headquarters, website],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async updatePublisher(id, { name, founded_year, headquarters, website }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `
          UPDATE publishers
          SET name = $2, founded_year = $3, headquarters = $4, website = $5
          WHERE publisher_id = $1
        `,
          [id, name, founded_year, headquarters, website],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async deletePublisher(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `DELETE  FROM publishers WHERE publisher_id = $1`,
          [id],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
  };
}
