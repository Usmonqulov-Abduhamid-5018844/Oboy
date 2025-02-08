-- Active: 1724135574484@@127.0.0.1@3306@wallpaper


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
LEFT JOIN orderItem ON orders.id = orderItem.order_id
LEFT JOIN product ON orderItem.product_id = product.id;

CREATE Table orderItem (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_id INTEGER,
    order_id INTEGER,
    count INTEGER,
    total INTEGER,
    Foreign Key (order_id) REFERENCES orders(id),
    Foreign Key (product_id) REFERENCES product(id)
);


SELECT 
    orders.id AS order_id,
    product.id AS product_id,
    product.nameUZ AS Product_Name_UZ,
    product.price AS Product_Price,
    product.descriptionUZ AS product_description_uz,
    product.washable AS product_washable,
    product.size AS product_size
FROM orderItem
JOIN orders ON orderItem.order_id = orders.id
JOIN product ON orderItem.product_id = product.id;


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

/* 
SELECT 
    brand.id AS brand_id,
    country.id AS country_id,
    product.nameUZ AS Product_Name_UZ,
    product.price AS Product_Price,
    product.descriptionUZ AS product_description_uz,
    product.washable AS product_washable,
    product.size AS product_size
FROM product
JOIN brand ON product.brand_id = brand.id
JOIN country ON product.country_id = country.id; */


SELECT 
    brand.id AS brand_id,
    country.id AS country_id,
    product.*
FROM product
JOIN brand ON product.brand_id = brand.id
JOIN country ON product.country_id = country.id;


CREATE Table categoryItem (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    category_id INTEGER,
    product_id INTEGER,
    Foreign Key (product_id) REFERENCES product(id),
    Foreign Key (category_id) REFERENCES category(id)
);


SELECT 
    product.id AS brand_id,
    category.id AS country_id,
    categoryItem.*
FROM categoryItem
JOIN product ON categoryItem.product_id = product_id
JOIN category ON categoryItem.category_id = category.id;


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
    nameRU VARCHAR(25),
    image: VARCHAR(20)
);

/* 
INSERT INTO users (fullName, phone, password, role)
VALUES 
('John Doe', '998901234567', 'password123', 'user'),
('Jane Smith', '998902345678', 'password456', 'admin'),
('Ali Karimov', '998903456789', 'password789', 'user'),
('O\'zodbek Yunusov', '998904567890', 'password012', 'user'),
('Xurshidbek Tashpulatov', '998905678901', 'password345', 'admin'),
('Umidbek Sobirov', '998906789012', 'password678', 'user'),
('Dilorom Xojieva', '998907890123', 'password901', 'user'),
('Murodjon Kobilov', '998908901234', 'password234', 'user'),
('Shahrizod Abdujalilova', '998909012345', 'password567', 'admin'),
('Asadbek Shomurodov', '998901023456', 'password890', 'user'); */



/* INSERT INTO orderItem (product_id, order_id, count, total)
VALUES 
(31, 11, 2, 40000),
(32, 11, 3, 60000),
(33, 12, 1, 50000),
(34, 13, 4, 80000),
(35, 14, 2, 40000),
(36, 15, 3, 75000),
(37, 16, 1, 25000),
(38, 17, 2, 50000),
(39, 18, 5, 125000),
(40, 19, 4, 96000); */

/* 
INSERT INTO product (nameUZ, nameRU, brand_id, country_id, price, oldPrice, available, descriptionUZ, descriptionRU, washable, size)
VALUES 
('Mahsulot A', 'Продукт A', 1, 1, 50000, 60000, 100, 'O\'zbekiston mahsuloti A', 'Продукт A из Узбекистана', TRUE, 'M'),
('Mahsulot B', 'Продукт B', 2, 2, 75000, 80000, 50, 'O\'zbekiston mahsuloti B', 'Продукт B из Узбекистана', FALSE, 'L'),
('Mahsulot C', 'Продукт C', 3, 1, 45000, 50000, 150, 'Mahsulot C haqida', 'Продукт C о товаре', TRUE, 'S'),
('Mahsulot D', 'Продукт D', 1, 2, 55000, 60000, 200, 'Mahsulot D haqida', 'Продукт D о товаре', TRUE, 'M'),
('Mahsulot E', 'Продукт E', 2, 1, 30000, 35000, 250, 'Mahsulot E haqida', 'Продукт E о товаре', FALSE, 'L'),
('Mahsulot F', 'Продукт F', 3, 2, 100000, 110000, 30, 'Mahsulot F haqida', 'Продукт F о товаре', TRUE, 'M'),
('Mahsulot G', 'Продукт G', 4, 1, 20000, 25000, 120, 'Mahsulot G haqida', 'Продукт G о товаре', FALSE, 'S'),
('Mahsulot H', 'Продукт H', 5, 2, 120000, 130000, 80, 'Mahsulot H haqida', 'Продукт H о товаре', TRUE, 'M'),
('Mahsulot I', 'Продукт I', 1, 1, 40000, 45000, 180, 'Mahsulot I haqida', 'Продукт I о товаре', TRUE, 'L'),
('Mahsulot J', 'Продукт J', 2, 2, 90000, 100000, 50, 'Mahsulot J haqida', 'Продукт J о товаре', FALSE, 'L'); */

/* 
INSERT INTO category (nameUZ, nameRU, image)
VALUES 
('Elektronika', 'Электроника', 'elektronika.jpg'),
('Kiyim', 'Одежда', 'kiym.jpg'),
('Kompyuterlar', 'Компьютеры', 'kompyuter.jpg'),
('Telefonlar', 'Телефоны', 'telefon.jpg'),
('Televizorlar', 'Телевизоры', 'televizor.jpg'),
('O\'yinchoqlar', 'Игрушки', 'oyinchoqlar.jpg'),
('Kitoblar', 'Книги', 'kitob.jpg'),
('Kuzatuv kameralari', 'Камеры наблюдения', 'kamara.jpg'),
('Asboblar', 'Инструменты', 'asboblar.jpg'),
('Sifatli kiyimlar', 'Качественная одежда', 'kiyimlar.jpg'); */


/* INSERT INTO brand (nameUZ, nameRU, image)
VALUES 
('Brand A', 'Бренд А', 'brand_a_logo.jpg'),
('Brand B', 'Бренд Б', 'brand_b_logo.jpg'),
('Brand C', 'Бренд C', 'brand_c_logo.jpg'),
('Brand D', 'Бренд D', 'brand_d_logo.jpg'),
('Brand E', 'Бренд E', 'brand_e_logo.jpg'),
('Brand F', 'Бренд F', 'brand_f_logo.jpg'),
('Brand G', 'Бренд G', 'brand_g_logo.jpg'),
('Brand H', 'Бренд H', 'brand_h_logo.jpg'),
('Brand I', 'Бренд I', 'brand_i_logo.jpg'),
('Brand J', 'Бренд J', 'brand_j_logo.jpg'); */



/* INSERT INTO country (nameUZ, nameRU)
VALUES 
('O\'zbekiston', 'Узбекистан'),
('Rossiya', 'Россия'),
('AQSh', 'США'),
('Xitoy', 'Китай'),
('Germaniya', 'Германия'),
('Fransiya', 'Франция'),
('Italiya', 'Италия'),
('Angliya', 'Англия'),
('Turkiya', 'Турция'),
('Yaponiya', 'Япония'); */

/* 
INSERT INTO categoryItem (category_id, product_id)
VALUES 
(1, 31),
(2, 32),
(3, 33),
(4, 34),
(5, 35),
(6, 36),
(7, 37),
(8, 38),
(9, 39),
(10, 40); */


/* INSERT INTO orders (user_id, totalPrice)
VALUES 
(7, 200000),  -- 1-id foydalanuvchi uchun buyurtma
(8, 150000),  -- 2-id foydalanuvchi uchun buyurtma
(12, 250000),  -- 3-id foydalanuvchi uchun buyurtma
(9, 180000),  -- 4-id foydalanuvchi uchun buyurtma
(5, 220000),  -- 5-id foydalanuvchi uchun buyurtma
(6, 210000),  -- 6-id foydalanuvchi uchun buyurtma
(7, 190000),  -- 7-id foydalanuvchi uchun buyurtma
(8, 260000),  -- 8-id foydalanuvchi uchun buyurtma
(9, 230000),  -- 9-id foydalanuvchi uchun buyurtma
(10, 240000);  -- 10-id foydalanuvchi uchun buyurtma */


SELECT 
    orders.id AS order_id,
    orders.user_id AS User_id,
    users.fullName AS User_name,
    product.nameUZ AS product_name,
    orders.totalPrice AS Total_Price,
    orderItem.count,
    orderItem.total
FROM orders
JOIN users ON orders.user_id = users.id
LEFT JOIN orderItem ON orders.id = orderItem.order_id
LEFT JOIN product ON orderItem.product_id = product.id;
