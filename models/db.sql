-- Active: 1734330042184@@127.0.0.1@3306@wallpaper


CREATE Table users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(50),
    phone VARCHAR(20),
    password VARCHAR(255),
    role ENUM ('user', 'admin')
);

CREATE Table orders (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER,
    totalPrice INTEGER,
    Foreign Key (user_id) REFERENCES users (id)
);


SELECT 
    orders.id AS order_id,
    users.fullName AS name,
    product.nameUZ AS product_name,
    orderItem.count,
    orderItem.total
FROM orders
JOIN users ON orders.user_id = users.id
JOIN orderItem ON orders.id = orderItem.order_id
JOIN product ON orderItem.product_id = product.id;

CREATE Table orderItem (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_id INTEGER,
    order_id INTEGER,
    count INTEGER,
    total INTEGER,
    Foreign Key (order_id) REFERENCES orders(id),
    Foreign Key (product_id) REFERENCES product(id)
);

CREATE Table product (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nameUZ VARCHAR(100),
    nameRU VARCHAR(100),
    brand_id INTEGER,
    country_id INTEGER,
    price INTEGER,
    oldPrice INTEGER,
    available INTEGER,
    descriptionUZ TEXT,
    descriptionRU TEXT,
    washable BOOLEAN,
    size VARCHAR(255),
    Foreign Key (brand_id) REFERENCES brand(id),
    Foreign Key (country_id) REFERENCES country(id)
);

CREATE Table categoryItem (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    category_id INTEGER,
    product_id INTEGER,
    Foreign Key (product_id) REFERENCES product(id),
    Foreign Key (category_id) REFERENCES category(id)
);

CREATE TABLE category (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nameUZ VARCHAR(25),
    nameRU VARCHAR(25),
    image VARCHAR(255)
);

CREATE TABLE brand (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nameUZ VARCHAR(25),
    nameRU VARCHAR(25),
    logo VARCHAR(255)
);

ALTER TABLE brand CHANGE logo image VARCHAR(100);


CREATE TABLE country (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nameUZ VARCHAR(25),
    nameRU VARCHAR(25)
);
