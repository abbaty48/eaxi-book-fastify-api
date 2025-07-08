export default function cartDatasource(app) {
  return {
    async getCart(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM cart_items as ct, carts AS c WHERE ct.cart_id = $1 AND c.cart_id = $1`,
          [id],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async getCartItem({ customer_id, book_id, cart_id }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM cart_items as ct INNER JOIN carts as c
            ON  ct.cart_id = c.cart_id AND c.customer_id = $1 AND ct.book_id = $2 OR ct.cart_id = $3`,
          [customer_id, book_id, cart_id],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async getCarts({ q, sort, order_by, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM cart_items as ct INNER JOIN carts AS c ON ct.cart_id = c.cart_id
              ORDER BY ${order_by} ${sort} LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async addCart({ customer_id, book_id, quantity, coupon_code, is_active }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `WITH cart_insert AS (
              INSERT INTO carts(customer_id, coupon_code, is_active) VALUES($1,$2,$3) RETURNING cart_id
            )
            INSERT INTO cart_items(cart_id, book_id, quantity) VALUES((SELECT cart_id FROM cart_insert), $4, $5)
          `,
          [customer_id, coupon_code, is_active, book_id, quantity],
        );
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async updateCart(id, { coupon_code, is_active, quantity }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `WITH c AS (
                UPDATE  carts SET coupon_code = $2, is_active = $3
                WHERE carts.cart_id = $1
                RETURNING cart_id
            )
            UPDATE cart_items ct
            SET quantity = $4
            FROM c
            WHERE ct.cart_id = $1 AND c.cart_id = $1
            `,
          [id, coupon_code, is_active, quantity],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async removeCart(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(`DELETE FROM carts WHERE cart_id = $1`, [id]);
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
  };
}
