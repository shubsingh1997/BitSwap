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
-- Temporary view structure for view `transacview`
--

DROP TABLE IF EXISTS `transacview`;
/*!50001 DROP VIEW IF EXISTS `transacview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transacview` AS SELECT 
 1 AS `Transaction_ID`,
 1 AS `Transaction_type`,
 1 AS `Date_Time`,
 1 AS `status`,
 1 AS `Commision_type`,
 1 AS `Commision_Paid`,
 1 AS `Transaction_Amount`,
 1 AS `Client_ID`,
 1 AS `Trader_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cancelledtransactions`
--

DROP TABLE IF EXISTS `cancelledtransactions`;
/*!50001 DROP VIEW IF EXISTS `cancelledtransactions`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cancelledtransactions` AS SELECT 
 1 AS `Transaction_ID`,
 1 AS `Transaction_type`,
 1 AS `Date_Time`,
 1 AS `status`,
 1 AS `Commision_type`,
 1 AS `Commision_Paid`,
 1 AS `Transaction_Amount`,
 1 AS `Client_ID`,
 1 AS `Trader_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `traderclients`
--

DROP TABLE IF EXISTS `traderclients`;
/*!50001 DROP VIEW IF EXISTS `traderclients`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `traderclients` AS SELECT 
 1 AS `User_ID`,
 1 AS `Trader_ID`,
 1 AS `First_Name`,
 1 AS `Last_Name`,
 1 AS `email`,
 1 AS `Phone_number`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `transacview`
--

/*!50001 DROP VIEW IF EXISTS `transacview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transacview` AS select `transaction`.`Transaction_ID` AS `Transaction_ID`,`transaction`.`Transaction_type` AS `Transaction_type`,`transaction`.`Date_Time` AS `Date_Time`,`transaction`.`status` AS `status`,`transaction`.`Commision_type` AS `Commision_type`,`transaction`.`Commision_Paid` AS `Commision_Paid`,`transaction`.`Transaction_Amount` AS `Transaction_Amount`,`transaction`.`Client_ID` AS `Client_ID`,`transaction`.`Trader_ID` AS `Trader_ID` from `transaction` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cancelledtransactions`
--

/*!50001 DROP VIEW IF EXISTS `cancelledtransactions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cancelledtransactions` AS select `T`.`Transaction_ID` AS `Transaction_ID`,`T`.`Transaction_type` AS `Transaction_type`,`T`.`Date_Time` AS `Date_Time`,`T`.`status` AS `status`,`T`.`Commision_type` AS `Commision_type`,`T`.`Commision_Paid` AS `Commision_Paid`,`T`.`Transaction_Amount` AS `Transaction_Amount`,`T`.`Client_ID` AS `Client_ID`,`T`.`Trader_ID` AS `Trader_ID` from `transaction` `T` where (`T`.`status` = 'cancelled') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `traderclients`
--

/*!50001 DROP VIEW IF EXISTS `traderclients`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `traderclients` AS select `C`.`User_ID` AS `User_ID`,`C`.`Trader_ID` AS `Trader_ID`,`U`.`First_Name` AS `First_Name`,`U`.`Last_Name` AS `Last_Name`,`U`.`email` AS `email`,`U`.`Phone_number` AS `Phone_number` from (`user` `U` join `client` `C`) where (`U`.`User_ID` = `C`.`User_ID`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'DbProject'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `Tierchnage` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `Tierchnage` ON SCHEDULE EVERY 1 MINUTE STARTS '2021-12-04 16:58:47' ON COMPLETION NOT PRESERVE ENABLE DO begin
SET SQL_SAFE_UPDATES = 0;
update client set tier='Gold' where Client_ID in (Select distinct  t1.Client_ID from transaction as t1 where t1.Date_Time > now() - interval 1  Month and exists (SELECT t2.Client_ID FROM transaction as t2 where t2.Client_ID=t1.Client_ID and t2.Date_Time > now() - interval 1 Month Group BY Client_ID having sum(Transaction_Amount) > '36000000'));
SET SQL_SAFE_UPDATES = 1;

SET SQL_SAFE_UPDATES = 0;
update client set tier='Silver' where Client_ID in (Select distinct  t1.Client_ID from transaction as t1 where t1.Date_Time > now() - interval 1  Month and exists (SELECT t2.Client_ID FROM transaction as t2 where t2.Client_ID=t1.Client_ID and t2.Date_Time > now() - interval 1 Month Group BY Client_ID having sum(Transaction_Amount) <= '36000000'));
SET SQL_SAFE_UPDATES = 1;

end */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'DbProject'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04 22:38:36
