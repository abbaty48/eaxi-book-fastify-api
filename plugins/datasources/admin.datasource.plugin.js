export default function adminDatasource(app) {
  return {
    // return admin
    async admin(id) {
      return await app.pg.query("SELECT * FROM admins WHERE admin_id = ($1)", [
        id,
      ]);
    },
    // return admins
    async admins({ q, page, sort, limit, order_by }) {
      return await app.pg.query(
        `SELECT admin_id, name, email, is_active FROM admins
            ORDER BY $1, $2
            LIMIT $3 OFFSET $4
          `,
        [order_by, sort, limit, page],
      );
    },
    // addAdmin
    async addAdmin({ name, email, role, password_hash }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `INSERT INTO admins (name, email, role, password_hash)
                    VALUES ($1, $2, $3, $4)`,
          [name, email, role, password_hash],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    // updateAdmin
    async updateAdmin(id, { name, role, is_active, password_hash }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `UPDATE admins
          SET name = $2, role = $3, is_active = $4, password_hash = $5
          WHERE admin_id = $1`,
          [id, name, role, is_active, password_hash],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    // removeAdmin
    async removeAdmin(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query("DELETE FROM admins WHERE admin_id = $1", [
          id,
        ]);
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
  };
}
