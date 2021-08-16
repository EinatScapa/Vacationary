CREATE DATABASE vacationary;

USE vacationary;

CREATE TABLE users (
	id INT auto_increment,
    Fname VARCHAR (255),
    Lname VARCHAR (255),
    username VARCHAR (255),
    password VARCHAR (255),
    role VARCHAR (255) DEFAULT "user",
    PRIMARY KEY (id)
);

CREATE TABLE vacations (
	id INT auto_increment,
	destination VARCHAR (255),
    img VARCHAR (255),
	from_date date DEFAULT now(),
	to_date date DEFAULT now(),
    price INT,
    followers INT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE followed (
	id INT auto_increment,
    v_id INT,
    u_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (v_id)
        REFERENCES vacations(id)
        ON DELETE CASCADE,
    FOREIGN KEY (u_id)
        REFERENCES users(id)
        ON DELETE CASCADE  
);


INSERT INTO vacations (destination, img, from_date, to_date, price)
    VALUES ('Rome \ Italy','https://www.litterbins.co.uk/media/wysiwyg/Ancient_Rome.jpg', '2020-05-01', '2020-05-10', 500),
    ('Paris \ France','http://bestoffers.travel/UploadFiles/Offers/paris-vintage-car.jpg', '2020-07-15', '2020-07-20', 700), 
    ('London \ England','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZQdRCAkbZrglN6zzMI9AW-sUZcDRgPub1w&usqp=CAU', '2020-08-20', '2020-08-30', 800),
    ('Moscow \ Russia','https://cdn.turkishairlines.com/m/3c10acf9daab18e6/original/Travel-Guide-of-Moscow-via-Turkish-Airlines.jpg', '2020-09-20', '2020-09-30', 900);


INSERT INTO users (Fname, Lname, username, password)
    VALUES ('Einat' , 'Scapa' , 'Einat' , '$2b$10$CaafYuNaz593uvJ7Bj.RcOOyY8CpGIqwjhecwqOAC7TFit7KzeCcy'),
    ('Liat' , 'Scapa' , 'Liat' , '$2b$10$FA0QzYtSrZY8j6kWgPpMgOMK7G0ndUaTO4HW3DFv8L8rm5J.sv9vS');

UPDATE users SET role="admin" WHERE id=1;

------ אדמין ------
--username: Einat
-- password: 1234

------ משתמש ------
--username: Liat
-- password: 1234

