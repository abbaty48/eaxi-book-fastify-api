export default function categoryDatasource(app) {
  return {
    async getCategory(name) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(`SELECT * FROM categories WHERE name = $1`, [
          name,
        ]);
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async getCategories({ limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM categories
            ORDER BY name asc
            LIMIT $1 OFFSET $2
          `,
          [limit, page],
        );
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async addCategory({ name, description }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `INSERT  INTO categories(name, description) VALUES($1, $2)`,
          [name, description],
        );
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async updateCategory({ description, name }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `UPDATE categories SET description = $1 WHERE name = $2`,
          [description, name],
        );
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async deleteCategory(name) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`DELETE FROM categories WHERE name = $1`, [name]);
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
