export default function reviewDatasource(app) {
  return {
    async getReview(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM reviews WHERE review_id = $1`,
          [id],
        );
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async getReviews({ q, order_by, sort, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM reviews ORDER BY ${order_by} ${sort} LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async addReview({
      rating,
      book_id,
      customer_id,
      title,
      content,
      is_verified,
    }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `INSERT INTO reviews(rating, book_id, customer_id, title, content, is_verified)
            VALUES($1,$2,$3,$4,$5,$6)`,
          [rating, book_id, customer_id, title, content, is_verified],
        );
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async updateReview(id, { rating, title, content, is_verified }) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(
          `UPDATE reviews
            SET rating = $1, title = $2, content = $3, is_verified = $4
            WHERE review_id = $5
        `,
          [rating, title, content, is_verified, id],
        );
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async removeReview(id) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`DELETE FROM reviews WHERE review_id = $1`, [id]);
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
