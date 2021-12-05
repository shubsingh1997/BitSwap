CREATE DATABASE  IF NOT EXISTS `DbProject` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
-- Table structure for table `user`
--
use heroku_008edf26176e85b;
 
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `User_ID` varchar(25) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(150) DEFAULT NULL,
  `SSN` varchar(9) NOT NULL,
  `Phone_number` varchar(10) DEFAULT NULL,
  `Cellphone_number` varchar(10) DEFAULT NULL,
  `First_Name` varchar(25) DEFAULT NULL,
  `Last_Name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `SSN_UNIQUE` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1001','abc@123.com','password','123456741','9879876789','5674567896','JOHN','SHAH'),('1002','jeel123@gmail.com','$2a$08$jRND2fElxfiSNc/LoAHCCuyVdirS.B7VMnlNO5Z9N4J.rVKnLyxfi','287346371','6696121234','397667363','Jeel','Patel'),('1003','jayshah99@gmail.com','$2a$08$P0e1MEu05iIWYk1VHwiDleC8RgTR6CpMDoP5ZFASa7ENJWvR.aCnO','289762671','2876512987','9347655543','Jay','Shah'),('1004','pranav8877@gmail.com','$2a$08$7Cqd1NPlmWK6N6gj3JKmF.KZ4GJ2X26f7mlz32Y/b./GHWQcSmzwm','983662671','2876510999','9341234543','Pranav','Patel'),('1005','thathya1409@gmail.com','$2a$08$zM5uzraBlJGLjBTrHSMp2.Eovyzfp9gLtcBtRSTbla2a1SiCs5GP6','999662671','212345999','9341200997','Tathya','Patel'),('1006','shubham33@gmail.com','$2a$08$d3ypEzBfCYtxWEFTDklPj.bf9kudY26zIF7b4gVh58XdPtaWQib5y','999661122','553225999','9349908768','Shubham','Singh'),('1007','shar15@gmail.com','$2a$08$4K7ZRKO7h6Ox0UzZW8UvrOFVyvrveAST1aIRIrBLhgZk38cPHSgai','465734332','8479562491','9334565528','Sharveel','Acharya'),('1008','123456@jim.com','$2a$08$KIAG9sQEf/jBxJZqiGsW9.rjINpXzwCfzsCfYgyP.6hiWysfhnU0a','875495688','6028489630','0709476907','Adit','Shah'),('1009','pathak12@utd.edu','$2a$08$fqn2TCi1YyOzPjX6w4Sad./op7UckdUz1uvgcN3XlwW8x1Kfyl.Vy','962457825','8148196415','0823076593','Kirtan','Pathak'),('1010','yashm89@gmail.com','$2a$08$.MwoH620B4LhINaqm6x1BOUz4mR4V3m1g66jmVWgfGdbfHDs5vsmS','193458628','9346186010','2238957602','Yash','M'),('1011','mehta45@cal.edu','$2a$08$FdMikbrr4W9bOq4uOXzV6uvzbRzdeS8kVJXPXBstvWkKCs1CX/ZUu','999216116','9379792355','0476074255','Tirth','Mehta'),('1012','krish6789@uic.edu','$2a$08$kh5yVHOloMun0RS16ZDKjulO0kMY54kOYTyK7dQxErJ86xulAOpx.','934875629','9874562846','0983475131','Krish','Shah'),('1013','shifa93@yahoo.com','$2a$08$tHPxWuB6u0O3YwhkDP38SOa6G9GMR3kpAP.AIGOgiFjYwo8Z99aBu','827455632','6691234413','0782374826','Shifa','Shaikh'),('1014','kashifh9@gmail.com','$2a$08$CxFb6qGjoZOE/j41VVMgye3L0MvUptT1MUsr8xFD2WSReHrZUG9uW','960127433','9426515000','8078420524','Kashif','Hussain'),('1200','manager@utd.edu','password','837545992','9875268956','9742941209','Manager','Shah');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04 22:38:36
