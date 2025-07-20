export default function (app) {
  return {
    async getWishlist(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `
            SELECT * FROM wishlists as w, wishlist_items as wt
            WHERE w.wishlist_id = $1 AND wt.wishlist_id = $1
        `,
          [id],
        );
      } catch {
        return null;
      } finally {
        connect.release();
      }
    },
    async getWishlistItem({ customer_id, book_id }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `
            SELECT * FROM wishlists as w, wishlist_items as wt
            WHERE w.customer_id = $1 AND wt.wishlist_id = w.wishlist_id AND wt.book_id = $2
        `,
          [customer_id, book_id],
        );
      } catch (err) {
        return null;
      } finally {
        connect.release();
      }
    },
    async getWishlists({ q, order_by, sort, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM wishlists as w INNER JOIN wishlist_items AS wt ON w.wishlist_id = wt.wishlist_id
              ORDER BY ${order_by} ${sort} LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch (err) {
        return null;
      } finally {
        connect.release();
      }
    },
    async addWishlist({ name, customer_id, book_id, notes, is_public }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `
            WITH wishlist_insert AS (
                INSERT INTO wishlists(name, customer_id, is_public) VALUES($1,$2,$3) RETURNING wishlist_id
            )
              INSERT INTO wishlist_items(wishlist_id, book_id, notes) VALUES((SELECT wishlist_id FROM wishlist_insert ), $4, $5)
        `,
          [name, customer_id, is_public, book_id, notes],
        );
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async updateWishlist(id, { name, notes, is_public }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `
          WITH w AS (
            UPDATE wishlists
            SET name = $2, is_public = $3
            WHERE wishlists.wishlist_id = $1
            RETURNING wishlist_id
          )
          UPDATE wishlist_items wt
          SET notes = $4
          FROM w
          WHERE wt.wishlist_id = $1 AND w.wishlist_id = $1
        `,
          [id, name, is_public, notes],
        );
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async removeWishlist(id) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`DELETE FROM wishlists WHERE wishlist_id = $1`, [
          id,
        ]);
        return true;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
