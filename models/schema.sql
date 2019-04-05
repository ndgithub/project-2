DROP DATABASE IF EXISTS bank_db;
CREATE DATABASE bank_db;

USE bank_db;

CREATE table users (
    id INT(10) AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    uuid VARCHAR(255) NOT NULL,
    PRIMARY KEY (uuid)
);

CREATE table transactions (
    id INT AUTO_INCREMENT NOT NULL,
    type VARCHAR(50) NOT NULL,
    amount INT(10) NOT NULL,
    categories VARCHAR(50),
    user_ID INT(10) NOT NULL
);