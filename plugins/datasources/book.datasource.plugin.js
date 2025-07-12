export default function bookDatasource(app) {
  return {
    async getBook(id) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(`SELECT * FROM books WHERE book_id = $1`, [
          id,
        ]);
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
    async getBooks({ q, order_by, sort, limit, page }) {
      const connect = await app.pg.connect();
      try {
        return await app.pg.query(
          `SELECT * FROM books ORDER BY ${order_by} ${sort} LIMIT $1 OFFSET $2`,
          [limit, page],
        );
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async upsertBook(
      action,
      {
        title,
        isbn,
        price,
        stock,
        edition,
        format,
        language,
        cover_url,
        description,
        page_count,
        publisher_id,
        published_date,
        average_rating,
        book_id,
      },
    ) {
      const connect = await app.pg.connect();
      try {
        if (action === "insert") {
          await app.pg.query(
            `
              INSERT INTO books(
              title,
              isbn,
              price,
              stock,
              edition,
              format,
              language,
              cover_url,
              description,
              page_count,
              publisher_id,
              published_date,
              average_rating
              )
              VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
          `,
            [
              title,
              isbn,
              price,
              stock,
              edition,
              format,
              language,
              cover_url,
              description,
              page_count,
              publisher_id,
              published_date,
              average_rating,
            ],
          );
          return true;
        }
        if (action === "update") {
          await app.pg.query(
            `
              UPDATE  books
              SET
              title = $1,
              isbn = $2,
              price = $3,
              stock = $4,
              edition = $5,
              format = $6,
              language = $7,
              cover_url = $8,
              description =$9,
              page_count = $10,
              publisher_id = $11,
              published_date = $12,
              average_rating = $13
              WHERE book_id = $14
          `,
            [
              title,
              isbn,
              price,
              stock,
              edition,
              format,
              language,
              cover_url,
              description,
              page_count,
              publisher_id,
              published_date,
              average_rating,
              book_id,
            ],
          );
          return true;
        }
        return false;
      } catch (err) {
        return false;
      } finally {
        connect.release();
      }
    },
    async removeBook(id) {
      const connect = await app.pg.connect();
      try {
        await app.pg.query(`DELETE FROM books WHERE book_id = $1`, [id]);
        return true;
      } catch {
        return false;
      } finally {
        connect.release();
      }
    },
  };
}
