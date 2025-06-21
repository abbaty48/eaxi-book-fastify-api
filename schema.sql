CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
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
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS book_authors (
    book_id SERIAL REFERENCES books (book_id),
    author_id SERIAL REFERENCES authors (author_id),
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book_categories (
    book_id SERIAL REFERENCES books (book_id),
    category_id SERIAL REFERENCES categories (category_id),
    PRIMARY KEY (book_id, category_id)
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE,
    token VARCHAR(255),
    joinOn DATE DEFAULT CURRENT_DATE,
    profile jsonb
);

CREATE TABLE IF NOT EXISTS carts (
    cart_id SERIAL PRIMARY KEY,
    book_id SERIAL UNIQUE,
    quantity INT DEFAULT 1,
    addedAt DATE DEFAULT CURRENT_DATE,
    couponCode VARCHAR(10),
    lastUpdated DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS customer_carts (
    customer_id SERIAL REFERENCES customers (customer_id),
    cart_id SERIAL REFERENCES carts (cart_id),
    PRIMARY KEY (customer_id, cart_id)
);

CREATE TABLE IF NOT EXISTS wishlists (
    wishlist_id SERIAL NOT NULL UNIQUE,
    customer_id SERIAL NOT NULL UNIQUE,
    book_id SERIAL NOT NULL UNIQUE,
    addedAt DATE DEFAULT CURRENT_DATE,
    wishes INT,
    PRIMARY KEY (wishlist_id, customer_id, book_id)
);

CREATE TABLE IF NOT EXISTS wishlist_books (
    wishlist_id SERIAL REFERENCES wishlists (wishlist_id),
    book_id SERIAL REFERENCES books (book_id),
    PRIMARY KEY (wishlist_id, book_id)
);

CREATE TABLE IF NOT EXISTS customer_wishlists (
    wishlist_id SERIAL UNIQUE REFERENCES wishlists (wishlist_id),
    customer_id SERIAL UNIQUE REFERENCES customers (customer_id),
    PRIMARY KEY (wishlist_id, customer_id)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL,
    customer_id SERIAL,
    items jsonb,
    orderedDate DATE DEFAULT CURRENT_DATE,
    updatedDate DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (order_id, customer_id)
);

CREATE TABLE IF NOT EXISTS admins (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE,
    token VARCHAR(255) NOT NULL
);
