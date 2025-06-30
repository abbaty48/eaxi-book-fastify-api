export default function customerDatasource(app) {
  return {
    async getCustomer(email) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query("SELECT * FROM customers WHERE email = $1", [
          email,
        ]);
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async getCustomers({ q, sort, order_by, page, limit }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          ` SELECT * FROM customers
            ORDER BY $1, $2
            LIMIT $3 OFFSET $4
        `,
          [order_by, sort, limit, page],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async addOrUpdateOauthCustomer(
      action,
      { name, email, account_type, last_login, profile },
    ) {
      const connect = await app.pg.connect();
      try {
        if (action === "insert") {
          return await app.pg.query(
            "INSERT INTO customers(name, email, account_type, last_login, profile) VALUES($1,$2,$3,$4,$5)",
            [name, email, account_type, last_login, profile],
          );
        } else {
          return await app.pg.query(
            `UPDATE customers
            SET name = $1, email =$2, account_type = $3, last_login = $4, profile = $5
            WHERE email = $2
            `,
            [name, email, account_type, last_login, profile],
          );
        }
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async addOrUpdateLocalCustomer(
      action,
      { name, email, account_type, password_hash },
    ) {
      const connect = await app.pg.connect();
      try {
        if (action === "insert") {
          return await app.pg.query(
            "INSERT INTO customers(name, email, password_hash, account_type) VALUES($1,$2,$3,$4)",
            [name, email, password_hash, account_type],
          );
        }
        return null;
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async updateCustomer({ id, name, bio, birth_date, nationality }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `UPDATE customers
          SET name=$2, bio=$3, birth_date=$4, nationality=$5
          WHERE customer_id= $1`,
          [id, name, bio, birth_date, nationality],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async removeCustomer(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          "DELETE FROM customers WHERE customer_id = $1",
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
