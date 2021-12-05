CREATE DATABASE  IF NOT EXISTS `DbProject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `DbProject`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: DbProject
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `Transaction_ID` varchar(25) NOT NULL,
  `Transaction_type` varchar(10) DEFAULT NULL,
  `Date_Time` timestamp NULL DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `Commision_type` varchar(10) DEFAULT NULL,
  `Commision_Paid` float DEFAULT NULL,
  `Transaction_Amount` float NOT NULL,
  `Client_ID` varchar(25) NOT NULL,
  `Trader_ID` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Transaction_ID`,`Client_ID`,`status`),
  KEY `temp1_idx` (`Client_ID`),
  CONSTRAINT `temp1` FOREIGN KEY (`Client_ID`) REFERENCES `client` (`Client_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('TT_2021-11-28_00:23:24','Buy','2021-11-28 06:23:24','success','Dollar',10,110,'C_1002',NULL),('TT_2021-11-28_00:23:46','Sell','2021-11-28 06:23:46','success','Dollar',5,95,'C_1002',NULL),('TT_2021-11-28_04:38:35','Buy','2021-11-28 10:38:35','success','Dollar',100,1100,'C_1004',NULL),('TT_2021-11-28_04:38:43','Buy','2021-11-28 10:38:43','success','Bitcoin',0.5,500,'C_1004',NULL),('TT_2021-11-28_04:38:52','Sell','2021-11-28 10:38:52','success','Bitcoin',0.05,105,'C_1004',NULL),('TT_2021-11-28_04:39:01','Buy','2021-11-28 10:39:01','success','Dollar',40,440,'C_1004',NULL),('TT_2021-11-28_04:39:13','Sell','2021-11-28 10:39:13','success','Bitcoin',0.1,210,'C_1004',NULL),('TT_2021-11-28_04:40:08','Buy','2021-11-28 10:40:08','success','Dollar',150,1650,'C_1002',NULL),('TT_2021-11-28_04:40:15','Buy','2021-11-28 10:40:15','success','Bitcoin',0.9,900,'C_1002',NULL),('TT_2021-11-28_04:40:20','Sell','2021-11-28 10:40:20','success','Dollar',10,190,'C_1002',NULL),('TT_2021-11-28_04:40:27','Sell','2021-11-28 10:40:27','success','Bitcoin',0.35,735,'C_1002',NULL),('TT_2021-11-28_04:40:33','Buy','2021-11-28 10:40:33','success','Dollar',500,5500,'C_1002',NULL),('TT_2021-11-28_04:40:55','Buy','2021-11-28 10:40:55','success','Dollar',200,2200,'C_1002',NULL),('TT_2021-11-28_04:41:03','Buy','2021-11-28 10:41:03','success','Bitcoin',0.9,900,'C_1002',NULL),('TT_2021-11-28_04:41:09','Sell','2021-11-28 10:41:09','success','Dollar',15,285,'C_1002',NULL),('TT_2021-11-28_04:41:16','Sell','2021-11-28 10:41:16','success','Bitcoin',0.35,735,'C_1002',NULL),('TT_2021-11-28_04:43:16','Buy','2021-11-28 10:43:16','success','Dollar',990,10890,'C_1002',NULL),('TT_2021-11-28_04:43:30','Sell','2021-11-28 10:43:30','success','Bitcoin',1.15,2415,'C_1002',NULL),('TT_2021-11-28_21:03:30','Buy','2021-11-29 03:03:30','success','Dollar',549898,6048870,'C_1002',NULL),('TT_2021-11-28_21:03:50','Sell','2021-11-29 03:03:50','success','Bitcoin',0.6,659877,'C_1002',NULL),('TT_2021-11-28_21:04:29','Buy','2021-11-29 03:04:29','success','Dollar',824846,9073310,'C_1002',NULL),('TT_2021-11-28_21:04:44','Sell','2021-11-29 03:04:44','success','Dollar',192464,3656820,'C_1002',NULL),('TT_2021-11-28_21:04:53','Sell','2021-11-29 03:04:53','success','Dollar',96232.1,1828410,'C_1002',NULL),('TT_2021-11-28_21:04:59','Sell','2021-11-29 03:04:59','success','Bitcoin',4,4399180,'C_1002',NULL),('TT_2021-11-28_21:05:09','Buy','2021-11-29 03:05:09','success','Bitcoin',3.1,1704680,'C_1002',NULL),('TT_2021-11-29_14:05:30','Buy','2021-11-29 20:05:30','success','Dollar',5735.72,63093,'C_1005',NULL),('TT_2021-11-29_14:06:34','Sell','2021-11-29 20:06:34','success','Dollar',2867.86,54489.4,'C_1005',NULL),('TT_2021-11-29_14:07:00','Buy','2021-11-29 20:07:00','success','Dollar',28678.6,315465,'C_1005',NULL),('TT_2021-11-29_14:07:10','Buy','2021-11-29 20:07:10','success','Bitcoin',0.1,57357.2,'C_1005',NULL),('TT_2021-12-01_06:32:46','Buy','2021-12-01 12:32:46','success','Dollar',85365,939015,'C_1002',NULL),('TT_2021-12-01_06:33:36','Sell','2021-12-01 12:33:36','success','Bitcoin',0.25,284550,'C_1002',NULL),('TT_2021-12-03_20:55:54','Buy','2021-12-04 02:55:54','success','Dollar',21395.6,235352,'C_1008',NULL),('TT_2021-12-03_21:00:22','Buy','2021-12-04 03:00:22','cancelled','Bitcoin',0.1,53489,'C_1008','T_1006'),('TT_2021-12-03_21:00:22','Buy','2021-12-04 03:00:22','success','Bitcoin',0.1,53489,'C_1008','T_1006'),('TT_2021-12-03_21:02:06','Sell','2021-12-04 03:02:06','success','Dollar',5348.9,101629,'C_1008','T_1006'),('TT_2021-12-04_04:10:17','Buy','2021-12-04 10:10:17','success','Dollar',52209,574299,'C_1002',NULL),('TT_2021-12-04_04:10:23','Buy','2021-12-04 10:10:23','success','Dollar',78313.5,861448,'C_1002',NULL),('TT_2021-12-04_04:10:35','Buy','2021-12-04 10:10:35','success','Bitcoin',2.5,1305220,'C_1002',NULL),('TT_2021-12-04_04:10:43','Buy','2021-12-04 10:10:43','success','Bitcoin',3,1566270,'C_1002',NULL),('TT_2021-12-04_04:10:49','Sell','2021-12-04 10:10:49','success','Dollar',33935.9,644781,'C_1002',NULL),('TT_2021-12-04_04:28:52','Buy','2021-12-04 10:28:52','success','Dollar',5256.1,57817.1,'C_1011',NULL),('TT_2021-12-04_04:28:58','Buy','2021-12-04 10:28:58','success','Dollar',21024.4,231268,'C_1011',NULL),('TT_2021-12-04_04:29:05','Sell','2021-12-04 10:29:05','success','Bitcoin',0.1,105122,'C_1011',NULL),('TT_2021-12-04_04:29:14','Buy','2021-12-04 10:29:14','success','Bitcoin',0.1,52561,'C_1011',NULL),('TT_2021-12-04_04:30:14','Buy','2021-12-04 10:30:14','success','Dollar',15768.3,173451,'C_1012',NULL),('TT_2021-12-04_04:31:41','Buy','2021-12-04 10:31:41','success','Bitcoin',0.5,262805,'C_1012',NULL),('TT_2021-12-04_04:31:48','Sell','2021-12-04 10:31:48','success','Bitcoin',0.15,157683,'C_1012',NULL),('TT_2021-12-04_04:31:59','Buy','2021-12-04 10:31:59','success','Bitcoin',0.7,367927,'C_1012',NULL),('TT_2021-12-04_04:33:42','Buy','2021-12-04 10:33:42','success','Dollar',36755.6,404312,'C_1012',NULL),('TT_2021-12-04_04:39:11','Buy','2021-12-04 10:39:11','success','Dollar',15752.4,173276,'C_1013',NULL),('TT_2021-12-04_04:39:25','Buy','2021-12-04 10:39:25','success','Bitcoin',0.8,417745,'C_1013',NULL),('TT_2021-12-04_04:39:35','Buy','2021-12-04 10:39:35','success','Dollar',10443.6,114880,'C_1013',NULL),('TT_2021-12-04_04:39:45','Sell','2021-12-04 10:39:45','success','Bitcoin',0.1,104436,'C_1013',NULL),('TT_2021-12-04_04:39:52','Sell','2021-12-04 10:39:52','success','Dollar',2610.9,49607.2,'C_1013',NULL),('TT_2021-12-04_04:41:58','Buy','2021-12-04 10:41:58','success','Dollar',10443.6,114880,'C_1011','T_1006'),('TT_2021-12-04_04:42:08','Buy','2021-12-04 10:42:08','success','Bitcoin',0.3,156654,'C_1011','T_1006'),('TT_2021-12-04_04:43:33','Sell','2021-12-04 10:43:33','success','Bitcoin',0.05,52218.1,'C_1008','T_1006'),('TT_2021-12-04_04:43:39','Buy','2021-12-04 10:43:39','success','Dollar',20887.2,229760,'C_1008','T_1006'),('TT_2021-12-04_04:43:50','Sell','2021-12-04 10:43:50','success','Bitcoin',0.05,52218.1,'C_1008','T_1006'),('TT_2021-12-04_04:44:42','Sell','2021-12-04 10:44:42','success','Bitcoin',0.15,156654,'C_1012','T_1010'),('TT_2021-12-04_04:44:49','Sell','2021-12-04 10:44:49','success','Dollar',2610.9,49607.2,'C_1012','T_1010'),('TT_2021-12-04_04:44:58','Buy','2021-12-04 10:44:58','cancelled','Bitcoin',1,522181,'C_1012','T_1010'),('TT_2021-12-04_04:44:58','Buy','2021-12-04 10:44:58','success','Bitcoin',1,522181,'C_1012','T_1010'),('TT_2021-12-04_04:45:04','Buy','2021-12-04 10:45:04','cancelled','Dollar',15665.4,172320,'C_1012','T_1010'),('TT_2021-12-04_04:45:04','Buy','2021-12-04 10:45:04','success','Dollar',15665.4,172320,'C_1012','T_1010'),('TT_2021-12-04_04:45:10','Sell','2021-12-04 10:45:10','success','Bitcoin',0.15,156654,'C_1012','T_1010'),('TT_2021-12-04_04:45:16','Sell','2021-12-04 10:45:16','success','Dollar',13054.5,248036,'C_1012','T_1010'),('TT_2021-12-04_04:46:58','Buy','2021-12-04 10:46:58','success','Dollar',62427.6,686704,'C_1013',NULL),('TT_2021-12-04_04:47:06','Buy','2021-12-04 10:47:06','success','Bitcoin',0.1,52023,'C_1013',NULL),('TT_2021-12-04_04:47:42','Sell','2021-12-04 10:47:42','success','Bitcoin',0.1,104046,'C_1013',NULL),('TT_2021-12-04_04:47:47','Sell','2021-12-04 10:47:47','success','Dollar',18208.1,345953,'C_1013',NULL),('TT_2021-12-04_04:48:24','Buy','2021-12-04 10:48:24','success','Dollar',26011.5,286126,'C_1013','T_1009'),('TT_2021-12-04_04:48:43','Buy','2021-12-04 10:48:43','success','Bitcoin',0.4,208092,'C_1013','T_1009'),('TT_2021-12-04_04:49:25','Sell','2021-12-04 10:49:25','success','Bitcoin',0.1,104046,'C_1013','T_1009'),('TT_2021-12-04_04:49:43','Sell','2021-12-04 10:49:43','success','Dollar',10404.6,197687,'C_1013','T_1009'),('TT_2021-12-04_04:50:34','Buy','2021-12-04 10:50:34','cancelled','Dollar',36416.1,400577,'C_1013','T_1009'),('TT_2021-12-04_04:50:34','Buy','2021-12-04 10:50:34','success','Dollar',36416.1,400577,'C_1013','T_1009'),('TT_2021-12-04_16:20:18','Buy','2021-12-04 22:20:18','success','Dollar',24214.2,266356,'C_1012',NULL),('TT_2021-12-04_16:20:30','Sell','2021-12-04 22:20:30','success','Bitcoin',0.05,48428.3,'C_1012',NULL),('TT_2021-12-04_16:21:45','Buy','2021-12-04 22:21:45','success','Dollar',4842.83,53271.2,'C_1012','T_1010'),('TT_2021-12-04_16:23:07','Buy','2021-12-04 22:23:07','success','Dollar',9685.67,106542,'C_1012','T_1010'),('TT_2021-12-04_21:02:27','Sell','2021-12-05 03:02:27','success','Dollar',2467.35,46879.6,'C_1013',NULL),('TT_2021-12-04_21:02:33','Buy','2021-12-05 03:02:33','success','Bitcoin',0.3,148041,'C_1013',NULL),('TT_2021-12-04_21:04:53','Buy','2021-12-05 03:04:53','success','Dollar',14804.1,162845,'C_1013',NULL),('TT_2021-12-04_21:06:05','Buy','2021-12-05 03:06:05','success','Dollar',9836.2,108198,'C_1013',NULL),('TT_2021-12-04_21:06:12','Sell','2021-12-05 03:06:12','success','Dollar',14754.3,280332,'C_1013',NULL),('TT_2021-12-04_21:09:43','Buy','2021-12-05 03:09:43','success','Dollar',19701.6,216718,'C_1002',NULL),('TT_2021-12-04_21:09:49','Sell','2021-12-05 03:09:49','success','Dollar',17238.9,327539,'C_1002',NULL),('TT_2021-12-04_21:13:05','Buy','2021-12-05 03:13:05','success','Dollar',4925.4,54179.4,'C_1002',NULL),('TT_2021-12-04_21:14:12','Sell','2021-12-05 03:14:12','success','Dollar',17238.9,327539,'C_1002',NULL),('TT_2021-12-04_21:16:19','Sell','2021-12-05 03:16:19','success','Dollar',17130.5,325479,'C_1002',NULL),('TT_2021-12-04_21:16:25','Buy','2021-12-05 03:16:25','success','Bitcoin',0.3,146833,'C_1002',NULL),('TT_2021-12-04_21:22:11','Buy','2021-12-05 03:22:11','success','Dollar',19577.7,215355,'C_1002',NULL),('TT_2021-12-04_22:10:16','Buy','2021-12-05 04:10:16','success','Bitcoin',0.2,97534,'C_1002',NULL),('TT_2021-12-04_22:10:25','Sell','2021-12-05 04:10:25','success','Dollar',19506.8,370629,'C_1002',NULL),('TT_2021-12-04_22:32:55','Buy','2021-12-05 04:32:55','success','Dollar',4881.8,53699.8,'C_1008','T_1006'),('TT_2021-12-04_22:33:04','Sell','2021-12-05 04:33:04','success','Dollar',9763.6,185508,'C_1008','T_1006'),('TT_2021-12-04_22:35:27','Buy','2021-12-05 04:35:27','success','Dollar',4881.8,53699.8,'C_1008','T_1006'),('TT_2021-12-04_22:39:49','Sell','2021-12-05 04:39:49','success','Dollar',2440.9,46377.1,'C_1008','T_1006'),('TT_2021-12-04_22:39:58','Buy','2021-12-05 04:39:58','success','Dollar',9763.6,107400,'C_1008','T_1006'),('TT_2021-12-04_22:40:21','Buy','2021-12-05 04:40:21','success','Dollar',4881.8,53699.8,'C_1008','T_1006'),('TT_2021-12-04_22:43:41','Buy','2021-12-05 04:43:41','success','Dollar',4898.1,53879.1,'C_1008','T_1006'),('TT_2021-12-04_22:53:52','Buy','2021-12-05 04:53:52','success','Dollar',9800.2,107802,'C_1008','T_1006'),('TT_2021-12-04_22:54:02','Sell','2021-12-05 04:54:02','success','Dollar',2450.05,46550.9,'C_1008','T_1006'),('TT_2021-12-04_22:59:41','Buy','2021-12-05 04:59:41','success','Dollar',245810,2703910,'C_1002',NULL),('TT_2021-12-04_22:59:48','Buy','2021-12-05 04:59:48','success','Dollar',235978,3185700,'C_1002',NULL),('TT_2021-12-04_23:00:45','Buy','2021-12-05 05:00:45','success','Dollar',51128.5,690234,'C_1002',NULL),('TT_2021-12-04_23:18:41','Buy','2021-12-05 05:18:41','success','Dollar',15765.8,212838,'C_1002',NULL),('TT_2021-12-04_23:18:48','Sell','2021-12-05 05:18:48','success','Bitcoin',0.04,49268,'C_1002',NULL),('TT_2021-12-04_23:19:28','Buy','2021-12-05 05:19:28','success','Dollar',4926.8,54194.8,'C_1012','T_1010'),('TT_2021-12-04_23:19:41','Sell','2021-12-05 05:19:41','success','Bitcoin',0.15,147804,'C_1012','T_1010'),('TT_2021-12-04_23:20:07','Sell','2021-12-05 05:20:07','success','Bitcoin',0.3,295608,'C_1012','T_1010'),('TT_2021-12-04_23:20:15','Buy','2021-12-05 05:20:15','success','Bitcoin',0.5,246340,'C_1012','T_1010');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04 22:38:34
