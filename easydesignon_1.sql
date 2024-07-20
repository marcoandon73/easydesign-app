# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.7.34)
# Base de données: easydesignon_2
# Temps de génération: 2023-09-10 18:36:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table backgrounds
# ------------------------------------------------------------

DROP TABLE IF EXISTS `backgrounds`;

CREATE TABLE `backgrounds` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) DEFAULT NULL,
  `photo_thumb` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `dominating_color` varchar(255) DEFAULT NULL,
  `nbr_clicks` int(11) DEFAULT NULL,
  `nbr_views` int(11) DEFAULT NULL,
  `nbr_submits` int(11) DEFAULT NULL,
  `business_id` int(10) unsigned DEFAULT NULL,
  `storage_size` double DEFAULT NULL,
  `rule_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `backgrounds_business_id_foreign` (`business_id`),
  KEY `backgrounds_category_id_foreign` (`category_id`),
  KEY `FK_a29b1615cfec49bf8f5ac837761` (`rule_id`),
  CONSTRAINT `FK_7d3232cced9c6c2d1002e5d77f9` FOREIGN KEY (`category_id`) REFERENCES `bg_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_a29b1615cfec49bf8f5ac837761` FOREIGN KEY (`rule_id`) REFERENCES `rules` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e2b305cc8bc12d82b4f2c4209d5` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `backgrounds` WRITE;
/*!40000 ALTER TABLE `backgrounds` DISABLE KEYS */;

INSERT INTO `backgrounds` (`created_at`, `updated_at`, `deleted_at`, `id`, `photo`, `photo_thumb`, `order`, `category_id`, `name`, `description`, `price`, `dominating_color`, `nbr_clicks`, `nbr_views`, `nbr_submits`, `business_id`, `storage_size`, `rule_id`)
VALUES
	('2023-09-10 16:03:40.912986','2023-09-10 16:21:08.000000',NULL,5,'1694358219108.png','thumb_1694358219108.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(175, 149, 112)',NULL,NULL,NULL,1,15.514270782470703,13),
	('2023-09-10 16:03:42.829628','2023-09-10 16:21:03.000000',NULL,6,'1694358220920.png','thumb_1694358220920.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(89, 156, 64)',NULL,NULL,NULL,1,15.832314491271973,12),
	('2023-09-10 16:03:45.133992','2023-09-10 16:20:58.000000',NULL,7,'1694358222834.png','thumb_1694358222834.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(185, 185, 183)',NULL,NULL,NULL,1,13.470202445983887,11),
	('2023-09-10 16:03:47.422464','2023-09-10 16:20:32.000000',NULL,8,'1694358225138.png','thumb_1694358225138.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(131, 93, 177)',NULL,NULL,NULL,1,15.897405624389648,10),
	('2023-09-10 16:03:48.654066','2023-09-10 16:20:26.000000',NULL,9,'1694358227429.png','thumb_1694358227429.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(18, 28, 137)',NULL,NULL,NULL,1,15.493082046508789,9),
	('2023-09-10 16:03:49.964494','2023-09-10 16:20:21.000000',NULL,10,'1694358228658.png','thumb_1694358228658.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(112, 18, 18)',NULL,NULL,NULL,1,13.477120399475098,8),
	('2023-09-10 16:03:50.917419','2023-09-10 16:20:15.000000',NULL,11,'1694358229970.png','thumb_1694358229970.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(22, 22, 22)',NULL,NULL,NULL,1,6.420018196105957,7),
	('2023-09-10 16:03:52.026435','2023-09-10 16:20:10.000000',NULL,12,'1694358230920.png','thumb_1694358230920.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(193, 145, 16)',NULL,NULL,NULL,1,16.19698143005371,6),
	('2023-09-10 16:03:53.132664','2023-09-10 16:20:05.000000',NULL,13,'1694358232029.png','thumb_1694358232029.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(92, 92, 89)',NULL,NULL,NULL,1,13.757291793823242,5),
	('2023-09-10 16:03:54.270356','2023-09-10 16:19:59.000000',NULL,14,'1694358233136.png','thumb_1694358233136.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(177, 14, 14)',NULL,NULL,NULL,1,13.247920036315918,4),
	('2023-09-10 16:03:55.366768','2023-09-10 16:19:53.000000',NULL,15,'1694358234273.png','thumb_1694358234273.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(185, 76, 14)',NULL,NULL,NULL,1,16.16431999206543,3),
	('2023-09-10 16:03:56.529597','2023-09-10 16:19:48.000000',NULL,16,'1694358235369.png','thumb_1694358235369.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(180, 110, 133)',NULL,NULL,NULL,1,15.5994873046875,2),
	('2023-09-10 16:03:57.651620','2023-09-10 16:19:41.000000',NULL,17,'1694358236532.png','thumb_1694358236532.png',NULL,1,'Hoody','Sweet hoody',12,'rgb(21, 36, 31)',NULL,NULL,NULL,1,13.370079040527344,1);

/*!40000 ALTER TABLE `backgrounds` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table bg_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bg_categories`;

CREATE TABLE `bg_categories` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `photo_thumb` varchar(255) DEFAULT NULL,
  `business_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bg_categories_business_id_foreign` (`business_id`),
  CONSTRAINT `FK_ffcc92cd86283f4b8203114bd3b` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `bg_categories` WRITE;
/*!40000 ALTER TABLE `bg_categories` DISABLE KEYS */;

INSERT INTO `bg_categories` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `description`, `photo`, `photo_thumb`, `business_id`)
VALUES
	('2023-09-10 14:43:59.122053','2023-09-10 14:43:59.122053',NULL,1,'Hoodies','','1694353439047.png','thumb_1694353439047.png',1);

/*!40000 ALTER TABLE `bg_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table business_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `business_user`;

CREATE TABLE `business_user` (
  `user_id` int(10) unsigned NOT NULL,
  `business_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`business_id`),
  KEY `IDX_f07c6588cbdf29c751853f0919` (`user_id`),
  KEY `IDX_741f072528ee13bc8433d8dff6` (`business_id`),
  CONSTRAINT `FK_741f072528ee13bc8433d8dff6f` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f07c6588cbdf29c751853f09197` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `business_user` WRITE;
/*!40000 ALTER TABLE `business_user` DISABLE KEYS */;

INSERT INTO `business_user` (`user_id`, `business_id`)
VALUES
	(2,1);

/*!40000 ALTER TABLE `business_user` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table businesses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `businesses`;

CREATE TABLE `businesses` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `blocked_for_payment` timestamp NULL DEFAULT NULL,
  `blocked_at` timestamp NULL DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `messenger_link` varchar(255) DEFAULT NULL,
  `location_id` bigint(20) unsigned NOT NULL,
  `pricing_plan_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `businesses_location_id_foreign` (`location_id`),
  CONSTRAINT `FK_0b52d81920adf316187737f6030` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `businesses` WRITE;
/*!40000 ALTER TABLE `businesses` DISABLE KEYS */;

INSERT INTO `businesses` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `slug`, `blocked_for_payment`, `blocked_at`, `logo`, `description`, `phone`, `messenger_link`, `location_id`, `pricing_plan_id`, `email`, `website`, `address`)
VALUES
	('2023-09-10 14:30:23.518274','2023-09-10 19:35:52.785835',NULL,1,'easydesignon','easydesignon_1694352623483',NULL,NULL,NULL,NULL,NULL,NULL,240,NULL,'admin1@demo.com',NULL,NULL);

/*!40000 ALTER TABLE `businesses` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `photo_thumb` varchar(255) DEFAULT NULL,
  `business_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_business_id_foreign` (`business_id`),
  CONSTRAINT `FK_91da72e2f6ec2a1c45a8f4aaf30` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;

INSERT INTO `categories` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `description`, `photo`, `photo_thumb`, `business_id`)
VALUES
	('2023-09-10 16:56:16.575822','2023-09-10 16:56:16.575822',NULL,1,'One piece','Animes one piece','1694361376489.png','thumb_1694361376489.png',1),
	('2023-09-10 16:57:00.419911','2023-09-10 16:57:00.419911',NULL,2,'Dragonball Z','Anime Dragonball Z','1694361420363.png','thumb_1694361420363.png',1),
	('2023-09-10 16:58:38.051944','2023-09-10 16:58:38.051944',NULL,3,'Attack on titan','Anime attack on titan','1694361518019.png','thumb_1694361518019.png',1);

/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table dimensions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dimensions`;

CREATE TABLE `dimensions` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `height` double(8,2) DEFAULT NULL,
  `width` double(8,2) DEFAULT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  `price` double(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dimensions_product_id_foreign` (`product_id`),
  CONSTRAINT `FK_b264035d93c04bc4e77adb6fc2c` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `country_name` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `native_country_name` varchar(255) DEFAULT NULL,
  `numericCode` varchar(255) DEFAULT NULL,
  `currency_code` varchar(255) DEFAULT NULL,
  `currency_symbol` varchar(255) DEFAULT NULL,
  `currency_name` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `language_native_name` varchar(255) DEFAULT NULL,
  `flag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;

INSERT INTO `locations` (`created_at`, `updated_at`, `deleted_at`, `id`, `country_name`, `region`, `native_country_name`, `numericCode`, `currency_code`, `currency_symbol`, `currency_name`, `language`, `language_native_name`, `flag`)
VALUES
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,1,'Afghanistan','Asia',NULL,'004','AFN','؋','Afghan afghani','Pashto',NULL,'https://restcountries.eu/data/afg.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,2,'Åland Islands','Europe',NULL,'248','EUR','€','Euro','Swedish',NULL,'https://restcountries.eu/data/ala.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,3,'Albania','Europe',NULL,'008','ALL','L','Albanian lek','Albanian',NULL,'https://restcountries.eu/data/alb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,4,'Algeria','Africa',NULL,'012','DZD','د.ج','Algerian dinar','Arabic',NULL,'https://restcountries.eu/data/dza.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,5,'American Samoa','Oceania',NULL,'016','USD','$','United State Dollar','English',NULL,'https://restcountries.eu/data/asm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,6,'Andorra','Europe',NULL,'020','EUR','€','Euro','Catalan',NULL,'https://restcountries.eu/data/and.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,7,'Angola','Africa',NULL,'024','AOA','Kz','Angolan kwanza','Portuguese',NULL,'https://restcountries.eu/data/ago.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,8,'Anguilla','Americas',NULL,'660','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/aia.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,9,'Antarctica','Polar',NULL,'010','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/ata.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,10,'Antigua and Barbuda','Americas',NULL,'028','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/atg.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,11,'Argentina','Americas',NULL,'032','ARS','$','Argentine peso','Spanish',NULL,'https://restcountries.eu/data/arg.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,12,'Armenia','Asia',NULL,'051','AMD',NULL,'Armenian dram','Armenian',NULL,'https://restcountries.eu/data/arm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,13,'Aruba','Americas',NULL,'533','AWG','ƒ','Aruban florin','Dutch',NULL,'https://restcountries.eu/data/abw.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,14,'Australia','Oceania',NULL,'036','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/aus.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,15,'Austria','Europe',NULL,'040','EUR','€','Euro','German',NULL,'https://restcountries.eu/data/aut.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,16,'Azerbaijan','Asia',NULL,'031','AZN',NULL,'Azerbaijani manat','Azerbaijani',NULL,'https://restcountries.eu/data/aze.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,17,'Bahamas','Americas',NULL,'044','BSD','$','Bahamian dollar','English',NULL,'https://restcountries.eu/data/bhs.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,18,'Bahrain','Asia',NULL,'048','BHD','.د.ب','Bahraini dinar','Arabic',NULL,'https://restcountries.eu/data/bhr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,19,'Bangladesh','Asia',NULL,'050','BDT','৳','Bangladeshi taka','Bengali',NULL,'https://restcountries.eu/data/bgd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,20,'Barbados','Americas',NULL,'052','BBD','$','Barbadian dollar','English',NULL,'https://restcountries.eu/data/brb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,21,'Belarus','Europe',NULL,'112','BYN','Br','New Belarusian ruble','Belarusian',NULL,'https://restcountries.eu/data/blr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,22,'Belgium','Europe',NULL,'056','EUR','€','Euro','Dutch',NULL,'https://restcountries.eu/data/bel.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,23,'Belize','Americas',NULL,'084','BZD','$','Belize dollar','English',NULL,'https://restcountries.eu/data/blz.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,24,'Benin','Africa',NULL,'204','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/ben.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,25,'Bermuda','Americas',NULL,'060','BMD','$','Bermudian dollar','English',NULL,'https://restcountries.eu/data/bmu.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,26,'Bhutan','Asia',NULL,'064','BTN','Nu.','Bhutanese ngultrum','Dzongkha',NULL,'https://restcountries.eu/data/btn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,27,'Bolivia (Plurinational State of)','Americas',NULL,'068','BOB','Bs.','Bolivian boliviano','Spanish',NULL,'https://restcountries.eu/data/bol.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,28,'Bonaire, Sint Eustatius and Saba','Americas',NULL,'535','USD','$','United States dollar','Dutch',NULL,'https://restcountries.eu/data/bes.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,29,'Bosnia and Herzegovina','Europe',NULL,'070','BAM',NULL,'Bosnia and Herzegovina convertible mark','Bosnian',NULL,'https://restcountries.eu/data/bih.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,30,'Botswana','Africa',NULL,'072','BWP','P','Botswana pula','English',NULL,'https://restcountries.eu/data/bwa.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,31,'Bouvet Island','',NULL,'074','NOK','kr','Norwegian krone','Norwegian',NULL,'https://restcountries.eu/data/bvt.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,32,'Brazil','Americas',NULL,'076','BRL','R$','Brazilian real','Portuguese',NULL,'https://restcountries.eu/data/bra.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,33,'British Indian Ocean Territory','Africa',NULL,'086','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/iot.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,34,'United States Minor Outlying Islands','Americas',NULL,'581','USD','$','United States Dollar','English',NULL,'https://restcountries.eu/data/umi.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,35,'Virgin Islands (British)','Americas',NULL,'092',NULL,'$','[D]','English',NULL,'https://restcountries.eu/data/vgb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,36,'Virgin Islands (U.S.)','Americas',NULL,'850','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/vir.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,37,'Brunei Darussalam','Asia',NULL,'096','BND','$','Brunei dollar','Malay',NULL,'https://restcountries.eu/data/brn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,38,'Bulgaria','Europe',NULL,'100','BGN','лв','Bulgarian lev','Bulgarian',NULL,'https://restcountries.eu/data/bgr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,39,'Burkina Faso','Africa',NULL,'854','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/bfa.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,40,'Burundi','Africa',NULL,'108','BIF','Fr','Burundian franc','French',NULL,'https://restcountries.eu/data/bdi.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,41,'Cambodia','Asia',NULL,'116','KHR','៛','Cambodian riel','Khmer',NULL,'https://restcountries.eu/data/khm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,42,'Cameroon','Africa',NULL,'120','XAF','Fr','Central African CFA franc','English',NULL,'https://restcountries.eu/data/cmr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,43,'Canada','Americas',NULL,'124','CAD','$','Canadian dollar','English',NULL,'https://restcountries.eu/data/can.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,44,'Cabo Verde','Africa',NULL,'132','CVE','Esc','Cape Verdean escudo','Portuguese',NULL,'https://restcountries.eu/data/cpv.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,45,'Cayman Islands','Americas',NULL,'136','KYD','$','Cayman Islands dollar','English',NULL,'https://restcountries.eu/data/cym.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,46,'Central African Republic','Africa',NULL,'140','XAF','Fr','Central African CFA franc','French',NULL,'https://restcountries.eu/data/caf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,47,'Chad','Africa',NULL,'148','XAF','Fr','Central African CFA franc','French',NULL,'https://restcountries.eu/data/tcd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,48,'Chile','Americas',NULL,'152','CLP','$','Chilean peso','Spanish',NULL,'https://restcountries.eu/data/chl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,49,'China','Asia',NULL,'156','CNY','¥','Chinese yuan','Chinese',NULL,'https://restcountries.eu/data/chn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,50,'Christmas Island','Oceania',NULL,'162','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/cxr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,51,'Cocos (Keeling) Islands','Oceania',NULL,'166','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/cck.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,52,'Colombia','Americas',NULL,'170','COP','$','Colombian peso','Spanish',NULL,'https://restcountries.eu/data/col.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,53,'Comoros','Africa',NULL,'174','KMF','Fr','Comorian franc','Arabic',NULL,'https://restcountries.eu/data/com.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,54,'Congo','Africa',NULL,'178','XAF','Fr','Central African CFA franc','French',NULL,'https://restcountries.eu/data/cog.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,55,'Congo (Democratic Republic of the)','Africa',NULL,'180','CDF','Fr','Congolese franc','French',NULL,'https://restcountries.eu/data/cod.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,56,'Cook Islands','Oceania',NULL,'184','NZD','$','New Zealand dollar','English',NULL,'https://restcountries.eu/data/cok.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,57,'Costa Rica','Americas',NULL,'188','CRC','₡','Costa Rican colón','Spanish',NULL,'https://restcountries.eu/data/cri.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,58,'Croatia','Europe',NULL,'191','HRK','kn','Croatian kuna','Croatian',NULL,'https://restcountries.eu/data/hrv.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,59,'Cuba','Americas',NULL,'192','CUC','$','Cuban convertible peso','Spanish',NULL,'https://restcountries.eu/data/cub.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,60,'Curaçao','Americas',NULL,'531','ANG','ƒ','Netherlands Antillean guilder','Dutch',NULL,'https://restcountries.eu/data/cuw.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,61,'Cyprus','Europe',NULL,'196','EUR','€','Euro','Greek (modern)',NULL,'https://restcountries.eu/data/cyp.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,62,'Czech Republic','Europe',NULL,'203','CZK','Kč','Czech koruna','Czech',NULL,'https://restcountries.eu/data/cze.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,63,'Denmark','Europe',NULL,'208','DKK','kr','Danish krone','Danish',NULL,'https://restcountries.eu/data/dnk.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,64,'Djibouti','Africa',NULL,'262','DJF','Fr','Djiboutian franc','French',NULL,'https://restcountries.eu/data/dji.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,65,'Dominica','Americas',NULL,'212','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/dma.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,66,'Dominican Republic','Americas',NULL,'214','DOP','$','Dominican peso','Spanish',NULL,'https://restcountries.eu/data/dom.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,67,'Ecuador','Americas',NULL,'218','USD','$','United States dollar','Spanish',NULL,'https://restcountries.eu/data/ecu.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,68,'Egypt','Africa',NULL,'818','EGP','£','Egyptian pound','Arabic',NULL,'https://restcountries.eu/data/egy.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,69,'El Salvador','Americas',NULL,'222','USD','$','United States dollar','Spanish',NULL,'https://restcountries.eu/data/slv.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,70,'Equatorial Guinea','Africa',NULL,'226','XAF','Fr','Central African CFA franc','Spanish',NULL,'https://restcountries.eu/data/gnq.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,71,'Eritrea','Africa',NULL,'232','ERN','Nfk','Eritrean nakfa','Tigrinya',NULL,'https://restcountries.eu/data/eri.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,72,'Estonia','Europe',NULL,'233','EUR','€','Euro','Estonian',NULL,'https://restcountries.eu/data/est.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,73,'Ethiopia','Africa',NULL,'231','ETB','Br','Ethiopian birr','Amharic',NULL,'https://restcountries.eu/data/eth.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,74,'Falkland Islands (Malvinas)','Americas',NULL,'238','FKP','£','Falkland Islands pound','English',NULL,'https://restcountries.eu/data/flk.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,75,'Faroe Islands','Europe',NULL,'234','DKK','kr','Danish krone','Faroese',NULL,'https://restcountries.eu/data/fro.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,76,'Fiji','Oceania',NULL,'242','FJD','$','Fijian dollar','English',NULL,'https://restcountries.eu/data/fji.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,77,'Finland','Europe',NULL,'246','EUR','€','Euro','Finnish',NULL,'https://restcountries.eu/data/fin.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,78,'France','Europe',NULL,'250','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/fra.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,79,'French Guiana','Americas',NULL,'254','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/guf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,80,'French Polynesia','Oceania',NULL,'258','XPF','Fr','CFP franc','French',NULL,'https://restcountries.eu/data/pyf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,81,'French Southern Territories','Africa',NULL,'260','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/atf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,82,'Gabon','Africa',NULL,'266','XAF','Fr','Central African CFA franc','French',NULL,'https://restcountries.eu/data/gab.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,83,'Gambia','Africa',NULL,'270','GMD','D','Gambian dalasi','English',NULL,'https://restcountries.eu/data/gmb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,84,'Georgia','Asia',NULL,'268','GEL','ლ','Georgian Lari','Georgian',NULL,'https://restcountries.eu/data/geo.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,85,'Germany','Europe',NULL,'276','EUR','€','Euro','German',NULL,'https://restcountries.eu/data/deu.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,86,'Ghana','Africa',NULL,'288','GHS','₵','Ghanaian cedi','English',NULL,'https://restcountries.eu/data/gha.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,87,'Gibraltar','Europe',NULL,'292','GIP','£','Gibraltar pound','English',NULL,'https://restcountries.eu/data/gib.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,88,'Greece','Europe',NULL,'300','EUR','€','Euro','Greek (modern)',NULL,'https://restcountries.eu/data/grc.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,89,'Greenland','Americas',NULL,'304','DKK','kr','Danish krone','Kalaallisut',NULL,'https://restcountries.eu/data/grl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,90,'Grenada','Americas',NULL,'308','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/grd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,91,'Guadeloupe','Americas',NULL,'312','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/glp.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,92,'Guam','Oceania',NULL,'316','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/gum.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,93,'Guatemala','Americas',NULL,'320','GTQ','Q','Guatemalan quetzal','Spanish',NULL,'https://restcountries.eu/data/gtm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,94,'Guernsey','Europe',NULL,'831','GBP','£','British pound','English',NULL,'https://restcountries.eu/data/ggy.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,95,'Guinea','Africa',NULL,'324','GNF','Fr','Guinean franc','French',NULL,'https://restcountries.eu/data/gin.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,96,'Guinea-Bissau','Africa',NULL,'624','XOF','Fr','West African CFA franc','Portuguese',NULL,'https://restcountries.eu/data/gnb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,97,'Guyana','Americas',NULL,'328','GYD','$','Guyanese dollar','English',NULL,'https://restcountries.eu/data/guy.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,98,'Haiti','Americas',NULL,'332','HTG','G','Haitian gourde','French',NULL,'https://restcountries.eu/data/hti.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,99,'Heard Island and McDonald Islands','',NULL,'334','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/hmd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,100,'Holy See','Europe',NULL,'336','EUR','€','Euro','Latin',NULL,'https://restcountries.eu/data/vat.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,101,'Honduras','Americas',NULL,'340','HNL','L','Honduran lempira','Spanish',NULL,'https://restcountries.eu/data/hnd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,102,'Hong Kong','Asia',NULL,'344','HKD','$','Hong Kong dollar','English',NULL,'https://restcountries.eu/data/hkg.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,103,'Hungary','Europe',NULL,'348','HUF','Ft','Hungarian forint','Hungarian',NULL,'https://restcountries.eu/data/hun.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,104,'Iceland','Europe',NULL,'352','ISK','kr','Icelandic króna','Icelandic',NULL,'https://restcountries.eu/data/isl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,105,'India','Asia',NULL,'356','INR','₹','Indian rupee','Hindi',NULL,'https://restcountries.eu/data/ind.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,106,'Indonesia','Asia',NULL,'360','IDR','Rp','Indonesian rupiah','Indonesian',NULL,'https://restcountries.eu/data/idn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,107,'Côte d\'Ivoire','Africa',NULL,'384','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/civ.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,108,'Iran (Islamic Republic of)','Asia',NULL,'364','IRR','﷼','Iranian rial','Persian (Farsi)',NULL,'https://restcountries.eu/data/irn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,109,'Iraq','Asia',NULL,'368','IQD','ع.د','Iraqi dinar','Arabic',NULL,'https://restcountries.eu/data/irq.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,110,'Ireland','Europe',NULL,'372','EUR','€','Euro','Irish',NULL,'https://restcountries.eu/data/irl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,111,'Isle of Man','Europe',NULL,'833','GBP','£','British pound','English',NULL,'https://restcountries.eu/data/imn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,112,'Israel','Asia',NULL,'376','ILS','₪','Israeli new shekel','Hebrew (modern)',NULL,'https://restcountries.eu/data/isr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,113,'Italy','Europe',NULL,'380','EUR','€','Euro','Italian',NULL,'https://restcountries.eu/data/ita.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,114,'Jamaica','Americas',NULL,'388','JMD','$','Jamaican dollar','English',NULL,'https://restcountries.eu/data/jam.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,115,'Japan','Asia',NULL,'392','JPY','¥','Japanese yen','Japanese',NULL,'https://restcountries.eu/data/jpn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,116,'Jersey','Europe',NULL,'832','GBP','£','British pound','English',NULL,'https://restcountries.eu/data/jey.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,117,'Jordan','Asia',NULL,'400','JOD','د.ا','Jordanian dinar','Arabic',NULL,'https://restcountries.eu/data/jor.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,118,'Kazakhstan','Asia',NULL,'398','KZT',NULL,'Kazakhstani tenge','Kazakh',NULL,'https://restcountries.eu/data/kaz.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,119,'Kenya','Africa',NULL,'404','KES','Sh','Kenyan shilling','English',NULL,'https://restcountries.eu/data/ken.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,120,'Kiribati','Oceania',NULL,'296','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/kir.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,121,'Kuwait','Asia',NULL,'414','KWD','د.ك','Kuwaiti dinar','Arabic',NULL,'https://restcountries.eu/data/kwt.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,122,'Kyrgyzstan','Asia',NULL,'417','KGS','с','Kyrgyzstani som','Kyrgyz',NULL,'https://restcountries.eu/data/kgz.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,123,'Lao People\'s Democratic Republic','Asia',NULL,'418','LAK','₭','Lao kip','Lao',NULL,'https://restcountries.eu/data/lao.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,124,'Latvia','Europe',NULL,'428','EUR','€','Euro','Latvian',NULL,'https://restcountries.eu/data/lva.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,125,'Lebanon','Asia',NULL,'422','LBP','ل.ل','Lebanese pound','Arabic',NULL,'https://restcountries.eu/data/lbn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,126,'Lesotho','Africa',NULL,'426','LSL','L','Lesotho loti','English',NULL,'https://restcountries.eu/data/lso.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,127,'Liberia','Africa',NULL,'430','LRD','$','Liberian dollar','English',NULL,'https://restcountries.eu/data/lbr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,128,'Libya','Africa',NULL,'434','LYD','ل.د','Libyan dinar','Arabic',NULL,'https://restcountries.eu/data/lby.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,129,'Liechtenstein','Europe',NULL,'438','CHF','Fr','Swiss franc','German',NULL,'https://restcountries.eu/data/lie.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,130,'Lithuania','Europe',NULL,'440','EUR','€','Euro','Lithuanian',NULL,'https://restcountries.eu/data/ltu.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,131,'Luxembourg','Europe',NULL,'442','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/lux.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,132,'Macao','Asia',NULL,'446','MOP','P','Macanese pataca','Chinese',NULL,'https://restcountries.eu/data/mac.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,133,'Macedonia (the former Yugoslav Republic of)','Europe',NULL,'807','MKD','ден','Macedonian denar','Macedonian',NULL,'https://restcountries.eu/data/mkd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,134,'Madagascar','Africa',NULL,'450','MGA','Ar','Malagasy ariary','French',NULL,'https://restcountries.eu/data/mdg.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,135,'Malawi','Africa',NULL,'454','MWK','MK','Malawian kwacha','English',NULL,'https://restcountries.eu/data/mwi.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,136,'Malaysia','Asia',NULL,'458','MYR','RM','Malaysian ringgit','Malaysian',NULL,'https://restcountries.eu/data/mys.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,137,'Maldives','Asia',NULL,'462','MVR','.ރ','Maldivian rufiyaa','Divehi',NULL,'https://restcountries.eu/data/mdv.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,138,'Mali','Africa',NULL,'466','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/mli.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,139,'Malta','Europe',NULL,'470','EUR','€','Euro','Maltese',NULL,'https://restcountries.eu/data/mlt.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,140,'Marshall Islands','Oceania',NULL,'584','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/mhl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,141,'Martinique','Americas',NULL,'474','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/mtq.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,142,'Mauritania','Africa',NULL,'478','MRO','UM','Mauritanian ouguiya','Arabic',NULL,'https://restcountries.eu/data/mrt.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,143,'Mauritius','Africa',NULL,'480','MUR','₨','Mauritian rupee','English',NULL,'https://restcountries.eu/data/mus.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,144,'Mayotte','Africa',NULL,'175','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/myt.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,145,'Mexico','Americas',NULL,'484','MXN','$','Mexican peso','Spanish',NULL,'https://restcountries.eu/data/mex.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,146,'Micronesia (Federated States of)','Oceania',NULL,'583',NULL,'$','[D]','English',NULL,'https://restcountries.eu/data/fsm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,147,'Moldova (Republic of)','Europe',NULL,'498','MDL','L','Moldovan leu','Romanian',NULL,'https://restcountries.eu/data/mda.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,148,'Monaco','Europe',NULL,'492','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/mco.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,149,'Mongolia','Asia',NULL,'496','MNT','₮','Mongolian tögrög','Mongolian',NULL,'https://restcountries.eu/data/mng.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,150,'Montenegro','Europe',NULL,'499','EUR','€','Euro','Serbian',NULL,'https://restcountries.eu/data/mne.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,151,'Montserrat','Americas',NULL,'500','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/msr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,152,'Morocco','Africa',NULL,'504','MAD','د.م.','Moroccan dirham','Arabic',NULL,'https://restcountries.eu/data/mar.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,153,'Mozambique','Africa',NULL,'508','MZN','MT','Mozambican metical','Portuguese',NULL,'https://restcountries.eu/data/moz.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,154,'Myanmar','Asia',NULL,'104','MMK','Ks','Burmese kyat','Burmese',NULL,'https://restcountries.eu/data/mmr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,155,'Namibia','Africa',NULL,'516','NAD','$','Namibian dollar','English',NULL,'https://restcountries.eu/data/nam.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,156,'Nauru','Oceania',NULL,'520','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/nru.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,157,'Nepal','Asia',NULL,'524','NPR','₨','Nepalese rupee','Nepali',NULL,'https://restcountries.eu/data/npl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,158,'Netherlands','Europe',NULL,'528','EUR','€','Euro','Dutch',NULL,'https://restcountries.eu/data/nld.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,159,'New Caledonia','Oceania',NULL,'540','XPF','Fr','CFP franc','French',NULL,'https://restcountries.eu/data/ncl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,160,'New Zealand','Oceania',NULL,'554','NZD','$','New Zealand dollar','English',NULL,'https://restcountries.eu/data/nzl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,161,'Nicaragua','Americas',NULL,'558','NIO','C$','Nicaraguan córdoba','Spanish',NULL,'https://restcountries.eu/data/nic.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,162,'Niger','Africa',NULL,'562','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/ner.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,163,'Nigeria','Africa',NULL,'566','NGN','₦','Nigerian naira','English',NULL,'https://restcountries.eu/data/nga.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,164,'Niue','Oceania',NULL,'570','NZD','$','New Zealand dollar','English',NULL,'https://restcountries.eu/data/niu.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,165,'Norfolk Island','Oceania',NULL,'574','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/nfk.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,166,'Korea (Democratic People\'s Republic of)','Asia',NULL,'408','KPW','₩','North Korean won','Korean',NULL,'https://restcountries.eu/data/prk.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,167,'Northern Mariana Islands','Oceania',NULL,'580','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/mnp.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,168,'Norway','Europe',NULL,'578','NOK','kr','Norwegian krone','Norwegian',NULL,'https://restcountries.eu/data/nor.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,169,'Oman','Asia',NULL,'512','OMR','ر.ع.','Omani rial','Arabic',NULL,'https://restcountries.eu/data/omn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,170,'Pakistan','Asia',NULL,'586','PKR','₨','Pakistani rupee','English',NULL,'https://restcountries.eu/data/pak.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,171,'Palau','Oceania',NULL,'585','(none)','$','[E]','English',NULL,'https://restcountries.eu/data/plw.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,172,'Palestine, State of','Asia',NULL,'275','ILS','₪','Israeli new sheqel','Arabic',NULL,'https://restcountries.eu/data/pse.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,173,'Panama','Americas',NULL,'591','PAB','B/.','Panamanian balboa','Spanish',NULL,'https://restcountries.eu/data/pan.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,174,'Papua New Guinea','Oceania',NULL,'598','PGK','K','Papua New Guinean kina','English',NULL,'https://restcountries.eu/data/png.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,175,'Paraguay','Americas',NULL,'600','PYG','₲','Paraguayan guaraní','Spanish',NULL,'https://restcountries.eu/data/pry.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,176,'Peru','Americas',NULL,'604','PEN','S/.','Peruvian sol','Spanish',NULL,'https://restcountries.eu/data/per.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,177,'Philippines','Asia',NULL,'608','PHP','₱','Philippine peso','English',NULL,'https://restcountries.eu/data/phl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,178,'Pitcairn','Oceania',NULL,'612','NZD','$','New Zealand dollar','English',NULL,'https://restcountries.eu/data/pcn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,179,'Poland','Europe',NULL,'616','PLN','zł','Polish złoty','Polish',NULL,'https://restcountries.eu/data/pol.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,180,'Portugal','Europe',NULL,'620','EUR','€','Euro','Portuguese',NULL,'https://restcountries.eu/data/prt.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,181,'Puerto Rico','Americas',NULL,'630','USD','$','United States dollar','Spanish',NULL,'https://restcountries.eu/data/pri.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,182,'Qatar','Asia',NULL,'634','QAR','ر.ق','Qatari riyal','Arabic',NULL,'https://restcountries.eu/data/qat.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,183,'Republic of Kosovo','Europe',NULL,NULL,'EUR','€','Euro','Albanian',NULL,'https://restcountries.eu/data/kos.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,184,'Réunion','Africa',NULL,'638','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/reu.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,185,'Romania','Europe',NULL,'642','RON','lei','Romanian leu','Romanian',NULL,'https://restcountries.eu/data/rou.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,186,'Russian Federation','Europe',NULL,'643','RUB','₽','Russian ruble','Russian',NULL,'https://restcountries.eu/data/rus.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,187,'Rwanda','Africa',NULL,'646','RWF','Fr','Rwandan franc','Kinyarwanda',NULL,'https://restcountries.eu/data/rwa.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,188,'Saint Barthélemy','Americas',NULL,'652','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/blm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,189,'Saint Helena, Ascension and Tristan da Cunha','Africa',NULL,'654','SHP','£','Saint Helena pound','English',NULL,'https://restcountries.eu/data/shn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,190,'Saint Kitts and Nevis','Americas',NULL,'659','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/kna.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,191,'Saint Lucia','Americas',NULL,'662','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/lca.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,192,'Saint Martin (French part)','Americas',NULL,'663','EUR','€','Euro','English',NULL,'https://restcountries.eu/data/maf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,193,'Saint Pierre and Miquelon','Americas',NULL,'666','EUR','€','Euro','French',NULL,'https://restcountries.eu/data/spm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,194,'Saint Vincent and the Grenadines','Americas',NULL,'670','XCD','$','East Caribbean dollar','English',NULL,'https://restcountries.eu/data/vct.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,195,'Samoa','Oceania',NULL,'882','WST','T','Samoan tālā','Samoan',NULL,'https://restcountries.eu/data/wsm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,196,'San Marino','Europe',NULL,'674','EUR','€','Euro','Italian',NULL,'https://restcountries.eu/data/smr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,197,'Sao Tome and Principe','Africa',NULL,'678','STD','Db','São Tomé and Príncipe dobra','Portuguese',NULL,'https://restcountries.eu/data/stp.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,198,'Saudi Arabia','Asia',NULL,'682','SAR','ر.س','Saudi riyal','Arabic',NULL,'https://restcountries.eu/data/sau.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,199,'Senegal','Africa',NULL,'686','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/sen.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,200,'Serbia','Europe',NULL,'688','RSD','дин.','Serbian dinar','Serbian',NULL,'https://restcountries.eu/data/srb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,201,'Seychelles','Africa',NULL,'690','SCR','₨','Seychellois rupee','French',NULL,'https://restcountries.eu/data/syc.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,202,'Sierra Leone','Africa',NULL,'694','SLL','Le','Sierra Leonean leone','English',NULL,'https://restcountries.eu/data/sle.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,203,'Singapore','Asia',NULL,'702','BND','$','Brunei dollar','English',NULL,'https://restcountries.eu/data/sgp.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,204,'Sint Maarten (Dutch part)','Americas',NULL,'534','ANG','ƒ','Netherlands Antillean guilder','Dutch',NULL,'https://restcountries.eu/data/sxm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,205,'Slovakia','Europe',NULL,'703','EUR','€','Euro','Slovak',NULL,'https://restcountries.eu/data/svk.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,206,'Slovenia','Europe',NULL,'705','EUR','€','Euro','Slovene',NULL,'https://restcountries.eu/data/svn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,207,'Solomon Islands','Oceania',NULL,'090','SBD','$','Solomon Islands dollar','English',NULL,'https://restcountries.eu/data/slb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,208,'Somalia','Africa',NULL,'706','SOS','Sh','Somali shilling','Somali',NULL,'https://restcountries.eu/data/som.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,209,'South Africa','Africa',NULL,'710','ZAR','R','South African rand','Afrikaans',NULL,'https://restcountries.eu/data/zaf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,210,'South Georgia and the South Sandwich Islands','Americas',NULL,'239','GBP','£','British pound','English',NULL,'https://restcountries.eu/data/sgs.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,211,'Korea (Republic of)','Asia',NULL,'410','KRW','₩','South Korean won','Korean',NULL,'https://restcountries.eu/data/kor.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,212,'South Sudan','Africa',NULL,'728','SSP','£','South Sudanese pound','English',NULL,'https://restcountries.eu/data/ssd.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,213,'Spain','Europe',NULL,'724','EUR','€','Euro','Spanish',NULL,'https://restcountries.eu/data/esp.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,214,'Sri Lanka','Asia',NULL,'144','LKR','Rs','Sri Lankan rupee','Sinhalese',NULL,'https://restcountries.eu/data/lka.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,215,'Sudan','Africa',NULL,'729','SDG','ج.س.','Sudanese pound','Arabic',NULL,'https://restcountries.eu/data/sdn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,216,'Suriname','Americas',NULL,'740','SRD','$','Surinamese dollar','Dutch',NULL,'https://restcountries.eu/data/sur.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,217,'Svalbard and Jan Mayen','Europe',NULL,'744','NOK','kr','Norwegian krone','Norwegian',NULL,'https://restcountries.eu/data/sjm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,218,'Swaziland','Africa',NULL,'748','SZL','L','Swazi lilangeni','English',NULL,'https://restcountries.eu/data/swz.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,219,'Sweden','Europe',NULL,'752','SEK','kr','Swedish krona','Swedish',NULL,'https://restcountries.eu/data/swe.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,220,'Switzerland','Europe',NULL,'756','CHF','Fr','Swiss franc','German',NULL,'https://restcountries.eu/data/che.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,221,'Syrian Arab Republic','Asia',NULL,'760','SYP','£','Syrian pound','Arabic',NULL,'https://restcountries.eu/data/syr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,222,'Taiwan','Asia',NULL,'158','TWD','$','New Taiwan dollar','Chinese',NULL,'https://restcountries.eu/data/twn.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,223,'Tajikistan','Asia',NULL,'762','TJS','ЅМ','Tajikistani somoni','Tajik',NULL,'https://restcountries.eu/data/tjk.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,224,'Tanzania, United Republic of','Africa',NULL,'834','TZS','Sh','Tanzanian shilling','Swahili',NULL,'https://restcountries.eu/data/tza.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,225,'Thailand','Asia',NULL,'764','THB','฿','Thai baht','Thai',NULL,'https://restcountries.eu/data/tha.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,226,'Timor-Leste','Asia',NULL,'626','USD','$','United States dollar','Portuguese',NULL,'https://restcountries.eu/data/tls.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,227,'Togo','Africa',NULL,'768','XOF','Fr','West African CFA franc','French',NULL,'https://restcountries.eu/data/tgo.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,228,'Tokelau','Oceania',NULL,'772','NZD','$','New Zealand dollar','English',NULL,'https://restcountries.eu/data/tkl.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,229,'Tonga','Oceania',NULL,'776','TOP','T$','Tongan paʻanga','English',NULL,'https://restcountries.eu/data/ton.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,230,'Trinidad and Tobago','Americas',NULL,'780','TTD','$','Trinidad and Tobago dollar','English',NULL,'https://restcountries.eu/data/tto.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,231,'Tunisia','Africa',NULL,'788','TND','د.ت','Tunisian dinar','Arabic',NULL,'https://restcountries.eu/data/tun.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,232,'Turkey','Asia',NULL,'792','TRY',NULL,'Turkish lira','Turkish',NULL,'https://restcountries.eu/data/tur.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,233,'Turkmenistan','Asia',NULL,'795','TMT','m','Turkmenistan manat','Turkmen',NULL,'https://restcountries.eu/data/tkm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,234,'Turks and Caicos Islands','Americas',NULL,'796','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/tca.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,235,'Tuvalu','Oceania',NULL,'798','AUD','$','Australian dollar','English',NULL,'https://restcountries.eu/data/tuv.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,236,'Uganda','Africa',NULL,'800','UGX','Sh','Ugandan shilling','English',NULL,'https://restcountries.eu/data/uga.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,237,'Ukraine','Europe',NULL,'804','UAH','₴','Ukrainian hryvnia','Ukrainian',NULL,'https://restcountries.eu/data/ukr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,238,'United Arab Emirates','Asia',NULL,'784','AED','د.إ','United Arab Emirates dirham','Arabic',NULL,'https://restcountries.eu/data/are.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,239,'United Kingdom of Great Britain and Northern Ireland','Europe',NULL,'826','GBP','£','British pound','English',NULL,'https://restcountries.eu/data/gbr.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,240,'United States of America','Americas',NULL,'840','USD','$','United States dollar','English',NULL,'https://restcountries.eu/data/usa.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,241,'Uruguay','Americas',NULL,'858','UYU','$','Uruguayan peso','Spanish',NULL,'https://restcountries.eu/data/ury.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,242,'Uzbekistan','Asia',NULL,'860','UZS',NULL,'Uzbekistani so\'m','Uzbek',NULL,'https://restcountries.eu/data/uzb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,243,'Vanuatu','Oceania',NULL,'548','VUV','Vt','Vanuatu vatu','Bislama',NULL,'https://restcountries.eu/data/vut.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,244,'Venezuela (Bolivarian Republic of)','Americas',NULL,'862','VEF','Bs F','Venezuelan bolívar','Spanish',NULL,'https://restcountries.eu/data/ven.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,245,'Viet Nam','Asia',NULL,'704','VND','₫','Vietnamese đồng','Vietnamese',NULL,'https://restcountries.eu/data/vnm.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,246,'Wallis and Futuna','Oceania',NULL,'876','XPF','Fr','CFP franc','French',NULL,'https://restcountries.eu/data/wlf.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,247,'Western Sahara','Africa',NULL,'732','MAD','د.م.','Moroccan dirham','Spanish',NULL,'https://restcountries.eu/data/esh.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,248,'Yemen','Asia',NULL,'887','YER','﷼','Yemeni rial','Arabic',NULL,'https://restcountries.eu/data/yem.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,249,'Zambia','Africa',NULL,'894','ZMW','ZK','Zambian kwacha','English',NULL,'https://restcountries.eu/data/zmb.svg'),
	('2023-09-10 12:38:57.653941','2023-09-10 12:38:57.653941',NULL,250,'Zimbabwe','Africa',NULL,'716','BWP','P','Botswana pula','English',NULL,'https://restcountries.eu/data/zwe.svg');

/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `timestamp`, `name`)
VALUES
	(1,1679670650754,'addDatabaseV11679670650754');

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table order_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_product`;

CREATE TABLE `order_product` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  `bg_id` bigint(20) unsigned DEFAULT NULL,
  `bg_size_id` int(10) unsigned DEFAULT NULL,
  `dimension_id` int(10) unsigned DEFAULT NULL,
  `custom_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_bg_size_id_foreign` (`bg_size_id`),
  KEY `order_bg_id_foreign` (`bg_id`),
  KEY `order_product_product_id_foreign` (`product_id`),
  KEY `order_product_order_id_foreign` (`order_id`),
  KEY `FK_ad97f0de0b7dcce021150eaac32` (`dimension_id`),
  CONSTRAINT `FK_400f1584bf37c21172da3b15e2d` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `FK_42f372c5bfb37b660ca599aedf7` FOREIGN KEY (`bg_size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ad97f0de0b7dcce021150eaac32` FOREIGN KEY (`dimension_id`) REFERENCES `dimensions` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `FK_ea143999ecfa6a152f2202895e2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_fe532011c6c90a79db8759e36c7` FOREIGN KEY (`bg_id`) REFERENCES `backgrounds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;

INSERT INTO `order_product` (`created_at`, `updated_at`, `deleted_at`, `id`, `order_id`, `product_id`, `bg_id`, `bg_size_id`, `dimension_id`, `custom_photo`)
VALUES
	('2023-09-10 17:05:39.434658','2023-09-10 17:05:39.434658',NULL,1,1,8,17,NULL,NULL,NULL),
	('2023-09-10 18:02:39.380859','2023-09-10 18:02:39.380859',NULL,2,2,2,13,NULL,NULL,NULL);

/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) DEFAULT NULL,
  `order_type` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_city` varchar(255) DEFAULT NULL,
  `customer_country` varchar(255) DEFAULT NULL,
  `customer_address` varchar(255) DEFAULT NULL,
  `customer_message` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed','canceled','started') DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `background_id` bigint(20) unsigned DEFAULT NULL,
  `business_id` int(10) unsigned DEFAULT NULL,
  `location_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_location_id_foreign` (`location_id`),
  KEY `orders_business_id_foreign` (`business_id`),
  CONSTRAINT `FK_0e78f67403faf37092dce90d73a` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_90e29013d1252e005e70beb4f46` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;

INSERT INTO `orders` (`created_at`, `updated_at`, `deleted_at`, `id`, `photo`, `order_type`, `customer_name`, `customer_phone`, `customer_city`, `customer_country`, `customer_address`, `customer_message`, `customer_email`, `status`, `price`, `background_id`, `business_id`, `location_id`)
VALUES
	('2023-09-10 17:05:39.424730','2023-09-10 17:06:02.000000',NULL,1,'1694361939390.png','full_order','anas','9800979',NULL,NULL,NULL,NULL,NULL,'pending',NULL,NULL,1,240),
	('2023-09-10 18:02:39.376559','2023-09-10 18:02:39.376559',NULL,2,'1694365359336.png','full_order','Ayoub','0312323',NULL,NULL,NULL,NULL,NULL,'started',NULL,NULL,1,240);

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table parameters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `parameters`;

CREATE TABLE `parameters` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `multiple_products_by_order` tinyint(1) NOT NULL DEFAULT '0',
  `customizable_logo` tinyint(1) NOT NULL DEFAULT '0',
  `primary_color` varchar(255) NOT NULL DEFAULT '#000',
  `secondary_color` varchar(255) NOT NULL DEFAULT '#4b68af',
  `empty_bg` tinyint(1) NOT NULL DEFAULT '1',
  `show_whatsapp` tinyint(1) NOT NULL DEFAULT '0',
  `show_facebook` tinyint(1) NOT NULL DEFAULT '0',
  `show_gmail` tinyint(1) NOT NULL DEFAULT '0',
  `show_ask_phone` tinyint(1) NOT NULL DEFAULT '0',
  `show_first_step` tinyint(1) NOT NULL DEFAULT '1',
  `show_second_step` tinyint(1) NOT NULL DEFAULT '1',
  `show_third_step` tinyint(1) NOT NULL DEFAULT '1',
  `show_shadow` tinyint(1) DEFAULT NULL,
  `unit` varchar(255) DEFAULT 'm(SI)',
  `startup_step` enum('1','2','3') NOT NULL DEFAULT '1',
  `lang` varchar(255) NOT NULL DEFAULT 'en',
  `business_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ffdc8216169c5faf51ca37ec82` (`business_id`),
  KEY `parameters_business_id_foreign` (`business_id`),
  CONSTRAINT `FK_ffdc8216169c5faf51ca37ec822` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `parameters` WRITE;
/*!40000 ALTER TABLE `parameters` DISABLE KEYS */;

INSERT INTO `parameters` (`created_at`, `updated_at`, `deleted_at`, `id`, `multiple_products_by_order`, `customizable_logo`, `primary_color`, `secondary_color`, `empty_bg`, `show_whatsapp`, `show_facebook`, `show_gmail`, `show_ask_phone`, `show_first_step`, `show_second_step`, `show_third_step`, `show_shadow`, `unit`, `startup_step`, `lang`, `business_id`)
VALUES
	('2023-09-10 14:30:23.790655','2023-09-10 14:30:23.790655',NULL,1,0,0,'#000','#4b68af',1,0,0,0,0,1,1,1,NULL,'m(SI)','1','en',1);

/*!40000 ALTER TABLE `parameters` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table password_resets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table payments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `validated_at` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `transaction_status` varchar(255) DEFAULT NULL,
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `balance_us` decimal(8,5) DEFAULT NULL,
  `pricing_plan_id` int(11) DEFAULT NULL,
  `for_year` int(11) DEFAULT NULL,
  `amount_to_pay_conversion` double DEFAULT NULL,
  `amount_to_pay_storage` double DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `business_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_token_unique` (`token`),
  UNIQUE KEY `IDX_581e5e83742647d3b7cc514595` (`token`),
  KEY `payments_business_id_foreign` (`business_id`),
  KEY `payments_user_id_foreign` (`user_id`),
  CONSTRAINT `FK_07889d42d0b29705cf4a649576b` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_427785468fb7d2733f59e7d7d39` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table payments_alerts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payments_alerts`;

CREATE TABLE `payments_alerts` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `business_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_alerts_business_id_foreign` (`business_id`),
  KEY `payments_alerts_user_id_foreign` (`user_id`),
  CONSTRAINT `FK_c02f3042cac8557d608f4980f70` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_df575dd9f90ee3185ab4bdf3c10` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;

INSERT INTO `permissions` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `guard_name`)
VALUES
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,1,'roles-list',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,2,'roles-create',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,3,'roles-delete',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,4,'users-list',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,5,'users-create',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,6,'users-delete',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,7,'users-block',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,8,'users-unblock',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,9,'users-update',NULL),
	('2023-09-10 12:38:57.405268','2023-09-10 12:38:57.405268',NULL,10,'users-getOne',NULL);

/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table pricing_plans
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pricing_plans`;

CREATE TABLE `pricing_plans` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration_unit` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `currency_code` varchar(255) NOT NULL DEFAULT 'USD',
  `number_of_duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table pricing_plans_terms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pricing_plans_terms`;

CREATE TABLE `pricing_plans_terms` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `resource` varchar(255) NOT NULL,
  `description` text,
  `price` varchar(255) DEFAULT NULL,
  `qte` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `pricing_plan_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pricing_plans_terms_pricing_plan_id_foreign` (`pricing_plan_id`),
  CONSTRAINT `FK_d8c674f485fcceaa137b182fa48` FOREIGN KEY (`pricing_plan_id`) REFERENCES `pricing_plans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table pricings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pricings`;

CREATE TABLE `pricings` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `location_id` bigint(20) unsigned NOT NULL,
  `whatsapp_price_usd` decimal(8,5) NOT NULL,
  `ask_phone_price_us` decimal(8,5) NOT NULL,
  `email_price_us` decimal(8,5) NOT NULL,
  `facebook_price_us` decimal(8,5) NOT NULL,
  `storage_pricing_gbs_us` decimal(8,5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pricings_location_id_foreign` (`location_id`),
  CONSTRAINT `FK_d5b67a2a443b803ff1fffed7eff` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) DEFAULT NULL,
  `photo_thumb` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `storage_size` double DEFAULT NULL,
  `dominating_color` varchar(255) DEFAULT NULL,
  `nbr_clicks` int(11) DEFAULT NULL,
  `nbr_views` int(11) DEFAULT NULL,
  `nbr_submits` int(11) DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `FK_9a5f6868c96e0069e699f33e124` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`created_at`, `updated_at`, `deleted_at`, `id`, `photo`, `photo_thumb`, `order`, `name`, `description`, `price`, `storage_size`, `dominating_color`, `nbr_clicks`, `nbr_views`, `nbr_submits`, `category_id`, `link`)
VALUES
	('2023-09-10 17:00:33.009687','2023-09-10 17:00:33.009687',NULL,1,'1694361632865.png','thumb_1694361632865.png',NULL,'attack on titan',NULL,NULL,0.3507261276245117,'rgb(69, 61, 56)',NULL,NULL,NULL,3,NULL),
	('2023-09-10 17:00:33.177844','2023-09-10 17:00:33.177844',NULL,2,'1694361633030.png','thumb_1694361633030.png',NULL,'attack on titan',NULL,NULL,1.15191650390625,'rgb(140, 102, 95)',NULL,NULL,NULL,3,NULL),
	('2023-09-10 17:00:33.241831','2023-09-10 17:00:33.241831',NULL,3,'1694361633181.png','thumb_1694361633181.png',NULL,'attack on titan',NULL,NULL,0.3382911682128906,'rgb(144, 91, 82)',NULL,NULL,NULL,3,NULL),
	('2023-09-10 17:00:33.302222','2023-09-10 17:00:33.302222',NULL,4,'1694361633244.png','thumb_1694361633244.png',NULL,'attack on titan',NULL,NULL,0.4179096221923828,'rgb(129, 114, 99)',NULL,NULL,NULL,3,NULL),
	('2023-09-10 17:01:32.467613','2023-09-10 17:01:32.467613',NULL,5,'1694361692402.png','thumb_1694361692402.png',NULL,'one piece',NULL,NULL,0.23182010650634766,'rgb(161, 130, 92)',NULL,NULL,NULL,1,NULL),
	('2023-09-10 17:01:33.233095','2023-09-10 17:01:33.233095',NULL,6,'1694361692471.png','thumb_1694361692471.png',NULL,'one piece',NULL,NULL,0.4639263153076172,'rgb(105, 3, 4)',NULL,NULL,NULL,1,NULL),
	('2023-09-10 17:01:33.346055','2023-09-10 17:01:33.346055',NULL,7,'1694361693235.png','thumb_1694361693235.png',NULL,'one piece',NULL,NULL,1.4404096603393555,'rgb(133, 107, 86)',NULL,NULL,NULL,1,NULL),
	('2023-09-10 17:01:33.529585','2023-09-10 17:01:33.529585',NULL,8,'1694361693348.png','thumb_1694361693348.png',NULL,'one piece',NULL,NULL,1.3000097274780273,'rgb(142, 82, 46)',NULL,NULL,NULL,1,NULL),
	('2023-09-10 17:02:11.707243','2023-09-10 17:02:11.707243',NULL,9,'1694361731636.png','thumb_1694361731636.png',NULL,'Dragonball Z',NULL,NULL,0.26145172119140625,'rgb(139, 43, 48)',NULL,NULL,NULL,2,NULL),
	('2023-09-10 17:02:12.018736','2023-09-10 17:02:12.018736',NULL,11,'1694361731874.png','thumb_1694361731874.png',NULL,'Dragonball Z',NULL,NULL,0.6035699844360352,'rgb(112, 88, 80)',NULL,NULL,NULL,2,NULL),
	('2023-09-10 17:02:44.424004','2023-09-10 17:02:44.424004',NULL,13,'1694361764386.png','thumb_1694361764386.png',NULL,'dragonball Z',NULL,NULL,0.35807228088378906,'rgb(104, 154, 31)',NULL,NULL,NULL,2,NULL);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table ratings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating_percent` varchar(255) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `business_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ratings_business_id_foreign` (`business_id`),
  KEY `FK_f49ef8d0914a14decddbb170f2f` (`user_id`),
  CONSTRAINT `FK_eb2016f2f2e0644f3ef16fdb49b` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f49ef8d0914a14decddbb170f2f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table role_has_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_has_permissions`;

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `IDX_09ff9df62bd01f8cf45b1b1921` (`permission_id`),
  KEY `IDX_9135e97d2d840f7dfd6e664911` (`role_id`),
  CONSTRAINT `FK_09ff9df62bd01f8cf45b1b1921a` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9135e97d2d840f7dfd6e6649116` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(4,1),
	(5,1),
	(6,1),
	(7,1),
	(8,1),
	(9,1),
	(10,1);

/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `guard_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `description`, `guard_name`)
VALUES
	('2023-09-10 12:38:57.385151','2023-09-10 12:38:57.385151',NULL,1,'super',NULL,NULL),
	('2023-09-10 12:38:57.385151','2023-09-10 12:38:57.385151',NULL,2,'admin',NULL,NULL),
	('2023-09-10 12:38:57.385151','2023-09-10 12:38:57.385151',NULL,3,'manager',NULL,NULL);

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table rules
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rules`;

CREATE TABLE `rules` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `parent_width` int(11) DEFAULT NULL,
  `parent_height` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;

INSERT INTO `rules` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `parent_width`, `parent_height`, `width`, `height`, `x`, `y`)
VALUES
	('2023-09-10 16:19:41.413804','2023-09-10 16:19:41.413804',NULL,1,'favorite_rule__1694359181410',736,783,171,211,282,299),
	('2023-09-10 16:19:48.374945','2023-09-10 16:19:48.374945',NULL,2,NULL,736,783,171,211,282,299),
	('2023-09-10 16:19:53.770239','2023-09-10 16:19:53.770239',NULL,3,NULL,736,783,171,211,282,299),
	('2023-09-10 16:19:59.827163','2023-09-10 16:19:59.827163',NULL,4,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:05.025196','2023-09-10 16:20:05.025196',NULL,5,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:10.687333','2023-09-10 16:20:10.687333',NULL,6,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:15.419137','2023-09-10 16:20:15.419137',NULL,7,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:21.427360','2023-09-10 16:20:21.427360',NULL,8,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:26.720760','2023-09-10 16:20:26.720760',NULL,9,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:32.163181','2023-09-10 16:20:32.163181',NULL,10,NULL,736,783,171,211,282,299),
	('2023-09-10 16:20:58.288670','2023-09-10 16:20:58.288670',NULL,11,NULL,736,783,171,211,282,299),
	('2023-09-10 16:21:03.538498','2023-09-10 16:21:03.538498',NULL,12,NULL,736,783,171,211,282,299),
	('2023-09-10 16:21:08.923162','2023-09-10 16:21:08.923162',NULL,13,NULL,736,783,171,211,282,299);

/*!40000 ALTER TABLE `rules` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table sizes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sizes`;

CREATE TABLE `sizes` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `background_id` bigint(20) unsigned DEFAULT NULL,
  `price` double(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sizes_background_id_foreign` (`background_id`),
  CONSTRAINT `FK_7a1be561c32fe8cec3aa8bafcd2` FOREIGN KEY (`background_id`) REFERENCES `backgrounds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table stats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stats`;

CREATE TABLE `stats` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nbr_whatsapp_submits` int(11) DEFAULT NULL,
  `nbr_email_submits` int(11) DEFAULT NULL,
  `nbr_facebook_submits` int(11) DEFAULT NULL,
  `nbr_ask_phone_submits` int(11) DEFAULT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  `business_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stats_business_id_foreign` (`business_id`),
  KEY `stats_product_id_foreign` (`product_id`),
  CONSTRAINT `FK_1dbc08be43c676a601928e4e38e` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_eb6be24edc95b1c38056d81b0b7` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table storage_actions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `storage_actions`;

CREATE TABLE `storage_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(10) unsigned DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` double NOT NULL,
  `action` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `storage_actions_created_by_foreign` (`created_by`),
  KEY `storage_actions_business_id_foreign` (`business_id`),
  CONSTRAINT `FK_45e0a489f771f052010860df3ed` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `FK_5ee9232036609d4a2d1d3aee418` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `storage_actions` WRITE;
/*!40000 ALTER TABLE `storage_actions` DISABLE KEYS */;

INSERT INTO `storage_actions` (`id`, `business_id`, `file_name`, `file_size`, `action`, `message`, `created_by`, `created_at`)
VALUES
	(1,1,'images/mydesign_1694352623483/backgrounds/1694353439047.png',0.08777141571044922,'upload','Anass CHBANI uploaded a file (0.08777141571044922 MB) in MyDesign business at 2023-09-10 13:43:59',2,'2023-09-10 14:43:59.108818'),
	(2,1,'images/mydesign_1694352623483/backgrounds/1694357888228.png',15.514270782470703,'upload','Anass CHBANI uploaded a file (15.514270782470703 MB) in MyDesign business at 2023-09-10 14:58:08',2,'2023-09-10 15:58:08.952232'),
	(3,1,'images/mydesign_1694352623483/backgrounds/1694358032501.png',15.514270782470703,'upload','Anass CHBANI uploaded a file (15.514270782470703 MB) in MyDesign business at 2023-09-10 15:00:33',2,'2023-09-10 16:00:33.268033'),
	(4,1,'images/mydesign_1694352623483/backgrounds/1694358139535.png',15.514270782470703,'upload','Anass CHBANI uploaded a file (15.514270782470703 MB) in MyDesign business at 2023-09-10 15:02:20',2,'2023-09-10 16:02:20.300510'),
	(5,1,'images/mydesign_1694352623483/backgrounds/1694358172959.png',15.514270782470703,'upload','Anass CHBANI uploaded a file (15.514270782470703 MB) in MyDesign business at 2023-09-10 15:02:53',2,'2023-09-10 16:02:53.724507'),
	(6,1,'images/mydesign_1694352623483/backgrounds/1694358219108.png',15.514270782470703,'upload','Anass CHBANI uploaded a file (15.514270782470703 MB) in MyDesign business at 2023-09-10 15:03:39',2,'2023-09-10 16:03:39.966923'),
	(7,1,'images/mydesign_1694352623483/backgrounds/1694358220920.png',15.832314491271973,'upload','Anass CHBANI uploaded a file (15.832314491271973 MB) in MyDesign business at 2023-09-10 15:03:42',2,'2023-09-10 16:03:42.354899'),
	(8,1,'images/mydesign_1694352623483/backgrounds/1694358222834.png',13.470202445983887,'upload','Anass CHBANI uploaded a file (13.470202445983887 MB) in MyDesign business at 2023-09-10 15:03:44',2,'2023-09-10 16:03:44.033257'),
	(9,1,'images/mydesign_1694352623483/backgrounds/1694358225138.png',15.897405624389648,'upload','Anass CHBANI uploaded a file (15.897405624389648 MB) in MyDesign business at 2023-09-10 15:03:46',2,'2023-09-10 16:03:46.771077'),
	(10,1,'images/mydesign_1694352623483/backgrounds/1694358227429.png',15.493082046508789,'upload','Anass CHBANI uploaded a file (15.493082046508789 MB) in MyDesign business at 2023-09-10 15:03:48',2,'2023-09-10 16:03:48.244264'),
	(11,1,'images/mydesign_1694352623483/backgrounds/1694358228658.png',13.477120399475098,'upload','Anass CHBANI uploaded a file (13.477120399475098 MB) in MyDesign business at 2023-09-10 15:03:49',2,'2023-09-10 16:03:49.499471'),
	(12,1,'images/mydesign_1694352623483/backgrounds/1694358229970.png',6.420018196105957,'upload','Anass CHBANI uploaded a file (6.420018196105957 MB) in MyDesign business at 2023-09-10 15:03:50',2,'2023-09-10 16:03:50.601357'),
	(13,1,'images/mydesign_1694352623483/backgrounds/1694358230920.png',16.19698143005371,'upload','Anass CHBANI uploaded a file (16.19698143005371 MB) in MyDesign business at 2023-09-10 15:03:51',2,'2023-09-10 16:03:51.638970'),
	(14,1,'images/mydesign_1694352623483/backgrounds/1694358232029.png',13.757291793823242,'upload','Anass CHBANI uploaded a file (13.757291793823242 MB) in MyDesign business at 2023-09-10 15:03:52',2,'2023-09-10 16:03:52.737883'),
	(15,1,'images/mydesign_1694352623483/backgrounds/1694358233136.png',13.247920036315918,'upload','Anass CHBANI uploaded a file (13.247920036315918 MB) in MyDesign business at 2023-09-10 15:03:53',2,'2023-09-10 16:03:53.867756'),
	(16,1,'images/mydesign_1694352623483/backgrounds/1694358234273.png',16.16431999206543,'upload','Anass CHBANI uploaded a file (16.16431999206543 MB) in MyDesign business at 2023-09-10 15:03:54',2,'2023-09-10 16:03:54.982504'),
	(17,1,'images/mydesign_1694352623483/backgrounds/1694358235369.png',15.5994873046875,'upload','Anass CHBANI uploaded a file (15.5994873046875 MB) in MyDesign business at 2023-09-10 15:03:56',2,'2023-09-10 16:03:56.132935'),
	(18,1,'images/mydesign_1694352623483/backgrounds/1694358236532.png',13.370079040527344,'upload','Anass CHBANI uploaded a file (13.370079040527344 MB) in MyDesign business at 2023-09-10 15:03:57',2,'2023-09-10 16:03:57.251596'),
	(19,1,'1694357888228.png',15.468245506286621,'remove','Anass CHBANI removed a file (15.4682 MB) in MyDesign business at 2023-09-10 15:20:42',2,'2023-09-10 16:20:42.022875'),
	(20,1,'thumb_1694357888228.png',0.04602527618408203,'remove','Anass CHBANI removed a file (0.0460 MB) in MyDesign business at 2023-09-10 15:20:42',2,'2023-09-10 16:20:42.027203'),
	(21,1,'1694358139535.png',15.468245506286621,'remove','Anass CHBANI removed a file (15.4682 MB) in MyDesign business at 2023-09-10 15:20:44',2,'2023-09-10 16:20:44.358215'),
	(22,1,'thumb_1694358139535.png',0.04602527618408203,'remove','Anass CHBANI removed a file (0.0460 MB) in MyDesign business at 2023-09-10 15:20:44',2,'2023-09-10 16:20:44.362675'),
	(23,1,'1694358172959.png',15.468245506286621,'remove','Anass CHBANI removed a file (15.4682 MB) in MyDesign business at 2023-09-10 15:20:46',2,'2023-09-10 16:20:46.861134'),
	(24,1,'thumb_1694358172959.png',0.04602527618408203,'remove','Anass CHBANI removed a file (0.0460 MB) in MyDesign business at 2023-09-10 15:20:46',2,'2023-09-10 16:20:46.867517'),
	(25,1,'1694358032501.png',15.468245506286621,'remove','Anass CHBANI removed a file (15.4682 MB) in MyDesign business at 2023-09-10 15:20:49',2,'2023-09-10 16:20:49.385877'),
	(26,1,'thumb_1694358032501.png',0.04602527618408203,'remove','Anass CHBANI removed a file (0.0460 MB) in MyDesign business at 2023-09-10 15:20:49',2,'2023-09-10 16:20:49.389950'),
	(27,1,'images/mydesign_1694352623483/products/1694361376489.png',0.4331932067871094,'upload','Anass CHBANI uploaded a file (0.4331932067871094 MB) in MyDesign business at 2023-09-10 15:56:16',2,'2023-09-10 16:56:16.554040'),
	(28,1,'images/mydesign_1694352623483/products/1694361420363.png',0.28810977935791016,'upload','Anass CHBANI uploaded a file (0.28810977935791016 MB) in MyDesign business at 2023-09-10 15:57:00',2,'2023-09-10 16:57:00.399136'),
	(29,1,'images/mydesign_1694352623483/products/1694361518019.png',0.10760974884033203,'upload','Anass CHBANI uploaded a file (0.10760974884033203 MB) in MyDesign business at 2023-09-10 15:58:38',2,'2023-09-10 16:58:38.042792'),
	(30,1,'images/mydesign_1694352623483/products/1694361632865.png',0.3507261276245117,'upload','Anass CHBANI uploaded a file (0.3507261276245117 MB) in MyDesign business at 2023-09-10 16:00:32',2,'2023-09-10 17:00:32.965930'),
	(31,1,'images/mydesign_1694352623483/products/1694361633030.png',1.15191650390625,'upload','Anass CHBANI uploaded a file (1.15191650390625 MB) in MyDesign business at 2023-09-10 16:00:33',2,'2023-09-10 17:00:33.127276'),
	(32,1,'images/mydesign_1694352623483/products/1694361633181.png',0.3382911682128906,'upload','Anass CHBANI uploaded a file (0.3382911682128906 MB) in MyDesign business at 2023-09-10 16:00:33',2,'2023-09-10 17:00:33.215718'),
	(33,1,'images/mydesign_1694352623483/products/1694361633244.png',0.4179096221923828,'upload','Anass CHBANI uploaded a file (0.4179096221923828 MB) in MyDesign business at 2023-09-10 16:00:33',2,'2023-09-10 17:00:33.277987'),
	(34,1,'images/mydesign_1694352623483/products/1694361692402.png',0.23182010650634766,'upload','Anass CHBANI uploaded a file (0.23182010650634766 MB) in MyDesign business at 2023-09-10 16:01:32',2,'2023-09-10 17:01:32.441380'),
	(35,1,'images/mydesign_1694352623483/products/1694361692471.png',0.4639263153076172,'upload','Anass CHBANI uploaded a file (0.4639263153076172 MB) in MyDesign business at 2023-09-10 16:01:32',2,'2023-09-10 17:01:32.914097'),
	(36,1,'images/mydesign_1694352623483/products/1694361693235.png',1.4404096603393555,'upload','Anass CHBANI uploaded a file (1.4404096603393555 MB) in MyDesign business at 2023-09-10 16:01:33',2,'2023-09-10 17:01:33.298450'),
	(37,1,'images/mydesign_1694352623483/products/1694361693348.png',1.3000097274780273,'upload','Anass CHBANI uploaded a file (1.3000097274780273 MB) in MyDesign business at 2023-09-10 16:01:33',2,'2023-09-10 17:01:33.468768'),
	(38,1,'images/mydesign_1694352623483/products/1694361731636.png',0.26145172119140625,'upload','Anass CHBANI uploaded a file (0.26145172119140625 MB) in MyDesign business at 2023-09-10 16:02:11',2,'2023-09-10 17:02:11.679396'),
	(39,1,'images/mydesign_1694352623483/products/1694361731709.png',1.066213607788086,'upload','Anass CHBANI uploaded a file (1.066213607788086 MB) in MyDesign business at 2023-09-10 16:02:11',2,'2023-09-10 17:02:11.812814'),
	(40,1,'images/mydesign_1694352623483/products/1694361731874.png',0.6035699844360352,'upload','Anass CHBANI uploaded a file (0.6035699844360352 MB) in MyDesign business at 2023-09-10 16:02:11',2,'2023-09-10 17:02:11.972971'),
	(41,1,'images/mydesign_1694352623483/products/1694361732021.png',0.03341960906982422,'upload','Anass CHBANI uploaded a file (0.03341960906982422 MB) in MyDesign business at 2023-09-10 16:02:12',2,'2023-09-10 17:02:12.044297'),
	(42,1,'images/mydesign_1694352623483/products/1694361764386.png',0.35807228088378906,'upload','Anass CHBANI uploaded a file (0.35807228088378906 MB) in MyDesign business at 2023-09-10 16:02:44',2,'2023-09-10 17:02:44.410912'),
	(43,1,'1694361732021.png',0.021715164184570312,'remove','Anass CHBANI removed a file (0.0217 MB) in MyDesign business at 2023-09-10 16:02:47',2,'2023-09-10 17:02:47.206939'),
	(44,1,'thumb_1694361732021.png',0.011704444885253906,'remove','Anass CHBANI removed a file (0.0117 MB) in MyDesign business at 2023-09-10 16:02:47',2,'2023-09-10 17:02:47.210439'),
	(45,1,'1694361731709.png',0.9922780990600586,'remove','Anass CHBANI removed a file (0.9923 MB) in MyDesign business at 2023-09-10 16:02:53',2,'2023-09-10 17:02:53.440539'),
	(46,1,'thumb_1694361731709.png',0.07393550872802734,'remove','Anass CHBANI removed a file (0.0739 MB) in MyDesign business at 2023-09-10 16:02:53',2,'2023-09-10 17:02:53.445004'),
	(47,1,'images/mydesign_1694352623483/orders/1694361939390.png',0.501678466796875,'upload','A guest uploaded a file (0.501678466796875 MB) in MyDesign business at 2023-09-10 16:05:39',NULL,'2023-09-10 17:05:39.395119'),
	(48,1,'images/mydesign_1694352623483/orders/1694365359336.png',0.5188493728637695,'upload','A guest uploaded a file (0.5188493728637695 MB) in MyDesign business at 2023-09-10 17:02:39',NULL,'2023-09-10 18:02:39.339582');

/*!40000 ALTER TABLE `storage_actions` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table storage_consumptions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `storage_consumptions`;

CREATE TABLE `storage_consumptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(10) unsigned NOT NULL,
  `month` date NOT NULL,
  `year` int(11) NOT NULL,
  `size` double NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `storage_consumptions_business_id_foreign` (`business_id`),
  CONSTRAINT `FK_6b303c7811dd188fb95dab614f5` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `description2` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `email` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_user_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `roleId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `users_role_id_foreign` (`roleId`),
  CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`created_at`, `updated_at`, `deleted_at`, `id`, `lastname`, `name`, `firstname`, `address`, `phone`, `isActive`, `email`, `provider`, `provider_user_id`, `avatar`, `email_verified_at`, `password`, `salt`, `remember_token`, `roleId`)
VALUES
	('2023-09-10 12:38:57.539611','2023-09-10 12:38:57.539611',NULL,1,'superChbani','Anass CHBANI(super)','superAnass','Sbata','+212 06 30 93 19 97',1,'super@demo.com',NULL,NULL,NULL,'2023-09-10 12:38:58','$2b$10$H1MGbD4MQiacWg3yrFTVXuKGqySbMwZbMs/b9tCvk8a2B6f4r..8y','$2b$10$H1MGbD4MQiacWg3yrFTVXu',NULL,1),
	('2023-09-10 12:38:57.635859','2023-09-10 12:38:57.635859',NULL,2,'CHBANI','Anass CHBANI','Anass','Sbata','+212 06 30 93 19 97',1,'admin1@demo.com',NULL,NULL,NULL,'2023-09-10 12:38:58','$2b$10$H1MGbD4MQiacWg3yrFTVXuFzlHeWqyTVDQVDpAnjBeS2QXS67khsC','$2b$10$H1MGbD4MQiacWg3yrFTVXu',NULL,2);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table verify_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `verify_users`;

CREATE TABLE `verify_users` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
