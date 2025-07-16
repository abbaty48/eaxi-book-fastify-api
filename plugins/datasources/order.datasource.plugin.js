export default function (app) {
  return {
    async getOrder(id) {
      const connect = await app.pg.connect();

      try {
        return await app.pg.query(
          `SELECT * FROM orders AS o INNER JOIN order_items AS o_i ON o.order_id = $1 AND o_i.order_id = $1
          `,
          [id],
        );
      } catch (err) {
        throw err;
      } finally {
        connect.release();
      }
    },
    async getOrders({ q, order_by, sort, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM orders AS o INNER JOIN order_items AS o_i
              ON o_i.order_id = o.order_id
              ORDER BY ${order_by} ${sort} LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async upsertOrder(
      action,
      {
        order_id,
        book_id,
        customer_id,
        status,
        quantity,
        discount,
        unit_price,
        total_amount,
        billing_address,
        shipping_address,
        tracking_number,
        payment_method,
      },
    ) {
      const connect = await app.pg.connect();
      try {
        /* INSERT */
        if (action === "insert") {
          await app.pg.query(
            `WITH order_insert AS (
                            INSERT INTO orders (
                                customer_id, status, total_amount,
                                billing_address, shipping_address, tracking_number, payment_method)
                                VALUES($2,$3,$7,$8,$9,$10,$11)
                                RETURNING order_id
                            )
                  INSERT INTO order_items (order_id, book_id, quantity, discount, unit_price)
                  VALUES((SELECT order_id FROM order_insert), $1,$4,$5,$6)
            `,
            [
              book_id,
              customer_id,
              status,
              quantity,
              discount,
              unit_price,
              total_amount,
              billing_address,
              shipping_address,
              tracking_number,
              payment_method,
            ],
          );
        }
        /* UPDATE */
        if (action === "update") {
          await app.pg.query(
            `WITH order_update AS (
                  UPDATE orders
                    SET
                        customer_id = $3, status = $4,
                        total_amount = $8, billing_address = $9, shipping_address = $10,
                        tracking_number = $11, payment_method = $12
                        WHERE order_id = $1
                )
                UPDATE order_items
                    SET  book_id = $2, quantity = $5, discount = $6, unit_price = $7
                    WHERE order_id = $1
            `,
            [
              order_id,
              book_id,
              customer_id,
              status,
              quantity,
              discount,
              unit_price,
              total_amount,
              billing_address,
              shipping_address,
              tracking_number,
              payment_method,
            ],
          );
        }
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async removeOrder(id) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`DELETE FROM orders WHERE order_id  = $1`, [id]);
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
