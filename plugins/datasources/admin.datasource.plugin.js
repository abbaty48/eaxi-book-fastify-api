export default function adminDatasource(app) {
  return {
    /**
     *
     * @param {number} id of admins
     * @returns a promise array of admin search by an id or null if an error occured.
     */
    async admin(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          "SELECT admin_id, name, email, is_active, password_hash FROM admins WHERE admin_id = $1",
          [id],
        );
      } catch (err) {
        return null;
      } finally {
        connect.release();
      }
    },
    /**
     *
     * @param {object} an object for filtering, query and paginating.
     * @returns a promise of an array of paginated admins results or null if an error occured.
     */
    async admins({ q, sort, order_by, limit, page }) {
      const connect = await app.pg.connect();

      try {
        return await app.pg.query(
          `SELECT admin_id, name, email, is_active FROM admins
            ORDER BY ${order_by} ${sort}
            LIMIT $1 OFFSET $2
          `,
          [limit, page],
        );
      } catch {
        return null;
      } finally {
        connect.release();
      }
    },
    /**
     *
     * @param {object} a payload object for adding a admin
     * @returns {true} if adding is successful, otherwise {false} if an error occured.
     */
    async addAdmin({ name, email, role, password_hash }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `INSERT INTO admins (name, email, role, password_hash)
                    VALUES ($1, $2, $3, $4)`,
          [name, email, role, password_hash],
        );
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    /**
     *
     * @param {string} id representing the target admin to update.
     * @param {object} a payload object containing an updated data for admin.
     * @returns  {true} if updated, otherwise {false} if an error occured.
     */
    async updateAdmin(id, { name, role, is_active, password_hash }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `UPDATE admins
          SET name = $2, role = $3, is_active = $4, password_hash = $5
          WHERE admin_id = $1`,
          [id, name, role, is_active, password_hash],
        );
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    /**
     *
     * @param {number} id represeting the target admin to delete.
     * @returns {true} if successfully deleted, otherwise {false} if an error occured.
     */
    async removeAdmin(id) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query("DELETE FROM admins WHERE admin_id = $1", [id]);
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
