INSERT INTO publishers (publisher_id, name, founded_year, headquarters, website, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Penguin Random House', 1927, 'New York, NY', 'http://www.penguinrandomhouse.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'HarperCollins', 1989, 'New York, NY', 'http://www.harpercollins.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Simon & Schuster', 1924, 'New York, NY', 'http://www.simonandschuster.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Hachette Book Group', 2006, 'New York, NY', 'http://www.hachettebookgroup.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Macmillan', 1843, 'New York, NY', 'http://www.macmillan.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Scholastic', 1920, 'New York, NY', 'http://www.scholastic.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Wiley', 1807, 'Hoboken, NJ', 'http://www.wiley.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Oxford University Press', 1586, 'Oxford, UK', 'http://www.oup.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Cambridge University Press', 1534, 'Cambridge, UK', 'http://www.cambridge.org', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Bloomsbury', 1986, 'London, UK', 'http://www.bloomsbury.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO authors (author_id, name, bio, birth_date, nationality, created_at, updated_at) VALUES
    (gen_random_uuid(), 'George Orwell', 'English novelist and essayist, journalist and critic.', '1903-06-25', 'British', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'J.K. Rowling', 'British author, best known for the Harry Potter series.', '1965-07-31', 'British', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Mark Twain', 'American writer, humorist, entrepreneur, and publisher.', '1835-11-30', 'American', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Jane Austen', 'English novelist known for her six major novels.', '1875-12-16', 'British', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'F. Scott Fitzgerald', 'American novelist and short story writer.', '1896-09-24', 'American', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Ernest Hemingway', 'American novelist and short story writer.', '1899-07-21', 'American', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Agatha Christie', 'English writer known for her detective novels.', '1890-09-15', 'British', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Stephen King', 'American author of horror, supernatural fiction, suspense, and fantasy novels.', '1947-09-21', 'American', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'J.R.R. Tolkien', 'English writer, professor, and philologist.', '1892-09-22', 'British', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'C.S. Lewis', 'British writer and lay theologian.', '1898-11-29', 'British', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO categories (category_id, name, description, created_at) VALUES
    (gen_random_uuid(), 'Fiction', 'Literary works invented by the imagination.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Non-Fiction', 'Literary works based on facts and real events.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Science Fiction', 'Fiction based on imagined future scientific or technological advances.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Fantasy', 'Fiction with magical elements and fantastical worlds.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Mystery', 'Fiction dealing with the solution of a crime or the unraveling of a puzzle.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Biography', 'A detailed description of a person\''s life.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Self-Help', 'Books that are written to help readers improve their lives.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Romance', 'Fiction that centers on a romantic relationship.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Horror', 'Fiction intended to scare, frighten, or disgust.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Historical Fiction', 'Fiction set in the past, often with historical events or figures.', CURRENT_TIMESTAMP);

INSERT INTO tags (tag_id, name, created_at) VALUES
    (gen_random_uuid(), 'Bestseller', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Classic', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Award-Winning', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'New Release', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Popular', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Recommended', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Must-Read', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Contemporary', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Thriller', CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Young Adult', CURRENT_TIMESTAMP);


    INSERT INTO books (book_id, title, isbn, price, stock, cover_url, publisher_id, published_date, page_count, edition, language, format, average_rating, description, created_at, updated_at) VALUES
            (gen_random_uuid(), '1984', '978-0-28423-4', 15.99, 100, 'https://fakeimg.pl/300x400/333333/ffffff/?text=1984', (SELECT publisher_id FROM publishers LIMIT 1), '1949-06-08', 328, '1st', 'English', 'Paperback', 4.5, 'A dystopian novel set in a totalitarian society ruled by Big Brother.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'Harry Potter and the Sorcerer\''s Stone', '978-590-35340-3', 20.99, 150, 'https://fakeimg.pl/300x400/333333/ffffff/?text=Harry+Potter', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 1), '1997-06-26', 309, '1st', 'English', 'Hardcover', 4.8, 'The first book in the Harry Potter series, introducing the wizarding world.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'Pride and Prejudice', '978-19-95556-9', 12.99, 200, 'https://fakeimg.pl/300x400/333333/ffffff/?text=Pride+and+Prejudice', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 2), '1813-01-28', 279, '1st', 'English', 'Paperback', 4.6, 'A romantic novel that critiques the British landed gentry.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Great Gatsby', '978-7432-73556-5', 14.99, 120, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Great+Gatsby', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 3), '1925-04-10', 180, '1st', 'English', 'Hardcover', 4.4, 'A novel about the American dream and the disillusionment of the Jazz Age.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'To Kill a Mockingbird', '978-06-11008-4', 18.99, 80, 'https://fakeimg.pl/300x400/333333/ffffff/?text=To+Kill+a+Mockingbird', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 4), '1960-07-11', 281, '1st', 'English', 'Paperback', 4.7, 'A novel about the serious issues of rape and racial inequality.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Catcher in the Rye', '978-316-76948-0', 16.99, 90, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Catcher+in+the+Rye', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 5), '1951-07-16', 277, '1st', 'English', 'Hardcover', 4.2, 'A story about teenage angst and alienation.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'Brave New World', '978-06-08052-4', 17.99, 110, 'https://fakeimg.pl/300x400/333333/ffffff/?text=Brave+New+World', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 6), '1932-08-31', 311, '1st', 'English', 'Paperback', 4.3, 'A dystopian novel that explores a technologically advanced future.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Hobbit', '978-618-00221-3', 19.99, 130, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Hobbit', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 7), '1937-09-21', 310, '1st', 'English', 'Hardcover', 4.8, 'A fantasy novel that follows the journey of Bilbo Baggins.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'Fahrenheit 451', '978-4516-75331-9', 15.99, 140, 'https://fakeimg.pl/300x400/333333/ffffff/?text=Fahrenheit+451', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 8), '1953-10-19', 158, '1st', 'English', 'Paperback', 4.5, 'A dystopian novel about a future where books are banned.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Alchemist', '978-06-11241-5', 16.99, 160, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Alchemist', (SELECT publisher_id FROM publishers LIMIT 1 OFFSET 9), '1988-04-15', 208, '1st', 'English', 'Hardcover', 4.6, 'A novel about a shepherd’s journey to find his personal legend.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Picture of Dorian Gray', '978-14-14395-7', 12.99, 75, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Picture+of+Dorian+Gray', (SELECT publisher_id FROM publishers LIMIT 1), '1890-07-01', 254, '1st', 'English', 'Paperback', 4.1, 'A novel about vanity and moral duplicity.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Grapes of Wrath', '978-14-30394-3', 14.99, 85, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Grapes+of+Wrath', (SELECT publisher_id FROM publishers LIMIT 1), '1939-04-14', 464, '1st', 'English', 'Hardcover', 4.4, 'A novel about the struggles of a family during the Great Depression.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Fault in Our Stars', '978-525-47881-2', 13.99, 95, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Fault+in+Our+Stars', (SELECT publisher_id FROM publishers LIMIT 1), '2012-01-10', 313, '1st', 'English', 'Paperback', 4.5, 'A love story between two teenagers with cancer.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Road', '978-307-26543-2', 15.99, 70, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Road', (SELECT publisher_id FROM publishers LIMIT 1), '2006-09-26', 287, '1st', 'English', 'Hardcover', 4.3, 'A post-apocalyptic novel about a father and son.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'Life of Pi', '978-15-10081-7', 16.99, 65, 'https://fakeimg.pl/300x400/333333/ffffff/?text=Life+of+Pi', (SELECT publisher_id FROM publishers LIMIT 1), '2001-09-11', 319, '1st', 'English', 'Paperback', 4.6, 'A novel about a boy stranded on a lifeboat with a tiger.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Kite Runner', '978-59448-17640-3', 18.99, 60, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Kite+Runner', (SELECT publisher_id FROM publishers LIMIT 1), '2003-05-29', 371, '1st', 'English', 'Hardcover', 4.7, 'A story of friendship and redemption set in Afghanistan.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Book Thief', '978-375-84220-7', 14.99, 55, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Book+Thief', (SELECT publisher_id FROM publishers LIMIT 1), '2005-03-01', 552, '1st', 'English', 'Paperback', 4.8, 'A novel narrated by Death about a girl in Nazi Germany.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Chronicles of Narnia', '978-06-44049-0', 19.99, 50, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Chronicles+of+Narnia', (SELECT publisher_id FROM publishers LIMIT 1), '1950-10-16', 768, '1st', 'English', 'Hardcover', 4.9, 'A series of seven fantasy novels by C.S. Lewis.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Hitchhiker\''s Guide to the Galaxy', '978-345-39180-3', 12.99, 45, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Hitchhiker\''s+Guide+to+the+Galaxy', (SELECT publisher_id FROM publishers LIMIT 1), '1979-10-12', 224, '1st', 'English', 'Paperback', 4.5, 'A comedic science fiction series.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Da Vinci Code', '978-385-50420-8', 15.99, 40, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Da+Vinci+Code', (SELECT publisher_id FROM publishers LIMIT 1), '2003-03-18', 454, '1st', 'English', 'Hardcover', 4.4, 'A mystery thriller novel that explores religious history.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'The Girl with the Dragon Tattoo', '978-307-45454-6', 16.99, 35, 'https://fakeimg.pl/300x400/333333/ffffff/?text=The+Girl+with+the+Dragon+Tattoo', (SELECT publisher_id FROM publishers LIMIT 1), '2005-08-01', 465, '1st', 'English', 'Paperback', 4.3, 'A psychological thriller about a journalist and a hacker.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (gen_random_uuid(), 'Gone Girl', '978-307-58837-2', 18.99, 30, 'https://fakeimg.pl/300x400/333333/ffffff/?text=Gone+Girl', (SELECT publisher_id FROM publishers LIMIT 1), '2012-06-05', 422, '1st', 'English', 'Hardcover', 4.5, 'A thriller about a marriage gone wrong.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
