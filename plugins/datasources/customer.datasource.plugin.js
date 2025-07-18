export default function customerDatasource(app) {
  return {
    async getCustomer(email) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(`SELECT * FROM customers WHERE email = $1`, [
          email,
        ]);
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async getCustomers({ q, sort, order_by, page, limit }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM customers
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
    async upsertCustomer(
      action,
      { name, email, account_type, last_login, profile, password_hash },
    ) {
      const connect = await app.pg.connect();
      try {
        if (action === "insert") {
          await app.pg.query(
            "INSERT INTO customers(name, email, account_type, last_login, profile) VALUES($1,$2,$3,$4,$5)",
            [name, email, account_type, last_login, profile],
          );
          return true;
        } else if (action === "update") {
          await app.pg.query(
            `UPDATE customers
            SET name = $1, email =$2, account_type = $3, last_login = $4, profile = $5, password_hash = $6
            WHERE email = $2
            `,
            [name, email, account_type, last_login, profile, password_hash],
          );
          return true;
        }
        return false;
      } catch (err) {
        // return false;
        throw err;
      } finally {
        connect.release();
      }
    },
    async removeCustomer(email) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query("DELETE FROM customers WHERE email = $1", [email]);
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
