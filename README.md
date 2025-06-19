# EAXI ONLINE BOOKSHOP API
    **OBJECTIVE** A fastify api for serving eaxi-books an online ecommerce web application/api.
    **DATABASE** PostgreSQL
    **FRAMEWORK**: Fastify
    **LANGUAGE**: javascript
    **PACKAGES**: Fastify-Plugin, @fastify/auth, @fastify/cors, @fastify/jwt, bcrypt, dotenv, @fastify/postgres, @fastify/helmet
    **VERSION**: 1.0
    **ENGINEER**: Abbatyya - abbaty48@gmail.com

## DATABASE COLLECTIONS
- Books
- Authors
- Customers
- Wishlists
- Carts
- Orders
- Admins

### COLLECTION SCHEMAS

 **Book**

```sql
CREATE TABLE IF NOT EXISTS books (
    book_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(17) UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    cover_url VARCHAR(512),
    publisher VARCHAR(255) NOT NULL,
    publishedDate DATE NOT NULL,
    pageCount INT NOT NULL,
    edition VARCHAR,
    language VARCHAR(40) NOT NULL,
    format VARCHAR NOT NULL,
    averageRating DECIMAL DEFAULT 0,
    tags VARCHAR,
    description TEXT,
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE IF NOT EXISTS authors (
    author_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS book_authors (
    book_id UUID REFERENCES books(book_id),
    author_id UUID REFERENCES authors(author_id),
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book_categories (
    book_id UUID REFERENCES books(book_id),
    category_id UUID REFERENCES categories(category_id),
    PRIMARY KEY (book_id, category_id)
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE,
    token VARCHAR(255),
    joinOn DATE DEFAULT NOW,
    profile jsonb
);

CREATE TABLE IF NOT EXISTS carts (
    cart_id UUID PRIMARY KEY,
    book_id UUID UNIQUE,
    quantity INT DEFAULT 1,
    addedAt DATE DEFAULT NOW,
    couponCode VARCHAR(10),
    lastUpdated DATE DEFAULT NOW
)

CREATE TABLE IF NOT EXISTS customer_carts (
    customer_id UUID REFERENCES customers(customer_id),
    cart_id UUID REFERENCES carts(cart_id),
    PRIMARY KEY(customer_id, cart_id)
)

CREATE TABLE IF NOT EXISTS wishlists (
    wishlist_id UUID,
    customer_id UUID,
    book_id UUID,
    addedAt DATE DEFAULT NOW,
    wishes INT,
    PRIMARY KEY(wishlist_id, customer_id, book_id)
)

CREATE TABLE IF NOT EXISTS wishlist_books (
    wishlist_id UUID REFERENCES wishlists(wishlist_id),
    book_id UUID REFERENCES books(book_id),
    PRIMARY KEY(wishlist_id, book_id)
)

CREATE TABLE IF NOT EXISTS customer_wishlists (
    wishlist_id UUID REFERENCES wishlists(wishlist_id),
    customer_id UUID REFERENCES customer(book_id),
    PRIMARY KEY(wishlist_id, customer_id)
)

CREATE TABLE IF NOT EXIST orders(
    order_id UUID,
    customer_id UUID,
    items jsonb,
    orderedDate DATE DEFAULT NOW,
    updatedDate DATE DEFAULT NOW,
    PRIMARY KEY(order_id, customer_id)
)

CREATE TABLE IF NOT EXIST admins(
    user_id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE,
    token VARCHAR(255) NOT NULL
)
```

**API ENDPOINTS**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `*` | `PATCH` | Handle application general error |
| `/` | `GET` | Return application informations |
| `/api/` | `GET` | Return Application information  |
| `/api/books` | `GET` | List all books |
| `/api/books/{id}` | `GET` | Get book details |
| `/api/books/search?q={query}` | `GET` | Search for books |
| `/api/books/filter?category={id}` | `GET` | Filter books by category |
| `/api/books/{limit}/{pageIndex}` | `GET` | Get books by paginations  |
| `/api/books` | `POST` | Add a new book |
| `/api/books/{id}` | `PATCH` | Update a book |
| `/api/books/{id}` | `DELETE` | Delete a book  |
| `/api/authors` | `GET` | List all authors |
| `/api/authors/{id}` | `GET` | Get a author details |
| `/api/authors/search?q={query}` | `GET` | Query a author |
| `/api/authors/{id}` | `PATCH` | Update a author |
| `/api/orders` | `GET` | List all orders |
| `/api/orders` | `PATCH` | Update a orders |
| `/api/orders/search?q={query}`| `GET` | Query for an order |
| `/api/carts`| `GET` | List for all carts |
| `/api/carts`| `POST` | Add a cart to carts |
| `/api/carts/{id}`| `GET` | Get cart details |
| `/api/carts/{id}` | `PATCH` | Update a cart detail |
| `/api/carts/search?q={query}` | `GET` | Query a cart details |
| `/api/wishlists` | `GET` | List all wishlists |
| `/api/wishlists/{id}` | `PATCH` | Update a wishlist |
| `/api/wishlists/search?q={query}` | `GET` | Query wishlists |
| `/api/customers` | `GET` | List all customers |
| `/api/customers/{id}` | `GET` | Get a customer details |
| `/api/customers/search?q={query}` | `GET` | Query a customer('s) |
| `/api/customers/{id}/carts` | `GET` | List customer carts |
| `/api/customers/orders` | `GET` | List customer carts |
| `/api/customers/` | `POST` | Register/Login a customer |
| `/api/customers/` | `PUT` | Update a customer details|
| `/api/customers/{id}` | `DELETE` | Delete a customer |
| ``
