CREATE TABLE IF NOT EXISTS books (
    book_id  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE TABLE IF NOT EXISTS admins(
    user_id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE,
    token VARCHAR(255) NOT NULL
)
