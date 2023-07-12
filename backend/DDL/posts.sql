CREATE DATABASE article;

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
    `Id` INT(20) NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(200) NOT NULL,
    `Content` TEXT NOT NULL,
    `Category` VARCHAR(100) NOT NULL,
    `Created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `Status` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`Id`)
);

-- Dummy Data
INSERT INTO `posts` (`Title`, `Content`, `Category`, `Status`) VALUES 
('10th Year DotA2 Anniversary', 'The new Battlepass is coming', 'Gaming', 'Publish'),
('Koenigsegg broke the 0-400-0 kmh record AGAIN!', 'Regera broke the record, driven by Markus Lundh', 'Automotive', 'Publish'),
('Draft title', 'Will be continue...', 'Economy', 'Draft'),
('Could Messi passthrough Asnawi?', 'Sadly, we could not see this rare opportunity', 'Sport', 'Trash'),
('Article 5', 'This is article #5', 'Dummy', 'Publish'),
('Article 6', 'This is article #6', 'Dummy', 'Publish'),
('Article 7', 'This is article #7', 'Dummy', 'Publish'),
('Article 8', 'This is article #8', 'Dummy', 'Draft'),
('Article 9', 'This is article #9', 'Dummy', 'Publish'),
('Article 10', 'This is article #10', 'Dummy', 'Draft'),
('Article 11', 'This is article #11', 'Dummy', 'Trash'),
('Article 12', 'This is article #12', 'Dummy', 'Trash'),
('Article 13', 'This is article #13', 'Dummy', 'Draft');

