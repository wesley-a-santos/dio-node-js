CREATE TABLE IF NOT EXISTS `application_users` (
  `uuid` VARCHAR(40) DEFAULT (uuid()),
  `username` VARCHAR(100) NOT NULL,
  `password` BLOB NOT NULL,
  PRIMARY KEY (`uuid`));

SET @chave = 'X6yrbMtYn5dEUgmQ';
INSERT INTO application_users (username, email, password) Values ('wesley', 'wesley.a.santos@gmail.com', AES_ENCRYPT('Sophi@2601', 'X6yrbMtYn5dEUgmQ'));
SELECT username, CAST(AES_DECRYPT(password, @Chave) AS CHAR) from application_users
