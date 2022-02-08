CREATE TABLE IF NOT EXISTS `application_users` (
  `uuid` VARCHAR(40) DEFAULT (uuid()),
  `username` VARCHAR(100) NOT NULL,
  `password` BLOB NOT NULL,
  PRIMARY KEY (`uuid`));

SET @chave = 'X6yrbMtYn5dEUgmQ';
INSERT INTO `application_users` (`username`, `password`) Values ('wesley', AES_ENCRYPT('Sophi@2601', @Chave));
SELECT username, CAST(AES_DECRYPT(password, @Chave) AS CHAR) from application_users
