DROP TABLE IF EXISTS USUARIOS;

CREATE TABLE USUARIOS (
	EMAIL VARCHAR (50) UNIQUE PRIMARY KEY ,
	PASSWORD VARCHAR (100) NOT NULL


);

INSERT INTO USUARIOS (EMAIL, PASSWORD ) VALUES ('who@fbi.com', 'me')
INSERT INTO USUARIOS (EMAIL, PASSWORD ) VALUES ('where@fbi.com','there')
INSERT INTO USUARIOS (EMAIL, PASSWORD ) VALUES ('how@fbi.com', 'exactly')

select * from usuarios;