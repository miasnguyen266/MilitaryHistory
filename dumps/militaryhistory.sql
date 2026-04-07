-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: militaryhistoryvn
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `adminlogs`
--

DROP TABLE IF EXISTS `adminlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminlogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `action` int NOT NULL,
  `item_id` int NOT NULL,
  `item_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminlogs`
--

LOCK TABLES `adminlogs` WRITE;
/*!40000 ALTER TABLE `adminlogs` DISABLE KEYS */;
INSERT INTO `adminlogs` VALUES (32,2,2,2,'Võ Nguyên Giáp','2026-04-01 02:10:36'),(34,2,1,18,'Trần Quốc Tuan','2026-04-01 02:14:25'),(35,2,2,18,'Trần Quốc Tuan','2026-04-01 02:17:49'),(36,2,1,19,'Nguyen DInh CHinh','2026-04-01 02:24:02'),(37,2,2,2,'Võ Nguyên Giáp','2026-04-01 02:43:15'),(38,2,2,19,'Nguyen DInh CHinh','2026-04-01 02:43:47'),(39,1,1,1,'dăd','2026-04-02 23:48:46'),(40,1,2,1,'dăd','2026-04-03 00:00:34'),(41,1,2,1,'dăd','2026-04-03 00:01:40'),(42,3,2,18,'Trần Quốc Tuan','2026-04-03 00:09:41'),(43,3,2,18,'Trần Quốc Tuan','2026-04-03 00:10:32'),(44,3,2,1,'Kháng chiến chống Pháp (1945-1954)','2026-04-03 00:10:47'),(45,3,2,1,'Hồ Chí Minh','2026-04-03 00:23:58'),(46,3,2,2,'Kháng chiến chống Mỹ cứu nước (1954-1975)','2026-04-03 00:24:26'),(47,3,2,2,'Kháng chiến chống Mỹ cứu nước (1954-1975)','2026-04-03 00:25:21'),(48,3,2,2,'Kháng chiến chống Mỹ cứu nước (1954-1975)','2026-04-03 00:39:03'),(49,3,2,18,'Trần Quốc Tuan','2026-04-03 00:40:31'),(50,1,1,2,'eqweq','2026-04-03 00:47:25'),(51,3,2,2,'Kháng chiến chống Mỹ cứu nước (1954-1975)','2026-04-03 09:59:12'),(52,3,2,2,'Kháng chiến chống Mỹ cứu nước (1954-1975)','2026-04-03 10:13:39'),(53,3,2,1,'Hồ Chí Minh','2026-04-03 10:17:05'),(54,2,1,20,'adawdawda','2026-04-03 10:47:49'),(55,2,1,21,'dawdawda','2026-04-03 10:48:06'),(56,2,1,22,'dawdawdawdaw','2026-04-03 10:48:26'),(57,2,1,23,'dawdawdawdawdawd','2026-04-03 10:48:57'),(58,2,1,24,'adwdawdawdawd','2026-04-03 10:50:10');
/*!40000 ALTER TABLE `adminlogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historicalfigurecontents`
--

DROP TABLE IF EXISTS `historicalfigurecontents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicalfigurecontents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `figure_id` int NOT NULL,
  `lang` enum('vi','en') COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `contributions` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_figure_lang` (`figure_id`,`lang`),
  CONSTRAINT `fk_figure_content` FOREIGN KEY (`figure_id`) REFERENCES `historicalfigures` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historicalfigurecontents_ibfk_1` FOREIGN KEY (`figure_id`) REFERENCES `historicalfigures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historicalfigurecontents`
--

LOCK TABLES `historicalfigurecontents` WRITE;
/*!40000 ALTER TABLE `historicalfigurecontents` DISABLE KEYS */;
INSERT INTO `historicalfigurecontents` VALUES (1,1,'vi','Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?Hồ Chí Minh (1890-1969), tên thật là Nguyễn Sinh Cung, là lãnh tụ vĩ đại của dân tộc Việt Nam, người sáng lập Đảng Cộng sản Việt Nam và nước Việt Nam Dân chủ Cộng hòa. Ông là nhà cách mạng, nhà văn hóa lớn, người đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc và xây dựng đất nước.?','Chủ tịch Hồ Chí Minh lãnh đạo cách mạng Tháng Tám thành công, khai sinh nước Việt Nam Dân chủ Cộng hòa năm 1945. Ông là người đặt nền móng cho đường lối kháng chiến chống Pháp và chống Mỹ, là biểu tượng của tinh thần yêu nước và độc lập dân tộc.'),(2,1,'en','Ho Chi Minh (1890-1969), real name Nguyen Sinh Cung, was the great leader of the Vietnamese nation, founder of the Communist Party of Vietnam and the Democratic Republic of Vietnam. He was a revolutionary, great cultural figure, who dedicated his life to the cause of national liberation and country building.','President Ho Chi Minh led the successful August Revolution, founding the Democratic Republic of Vietnam in 1945. He laid the foundation for the resistance policy against France and America, becoming the symbol of patriotism and national independence..'),(3,2,'vi','Đại tướng Võ Nguyên Giáp (1911-2013) là vị tướng tài ba của Quân đội Nhân dân Việt Nam, người được mệnh danh là \"Napoleon đỏ\". Ông là Tổng Tư lệnh Quân đội Nhân dân Việt Nam trong các cuộc kháng chiến chống Pháp và chống Mỹ.','Đại tướng Võ Nguyên Giáp chỉ huy Chiến dịch Điện Biên Phủ (1954) và Chiến dịch Hồ Chí Minh (1975), góp phần quan trọng vào hai chiến thắng lịch sử của dân tộc Việt Nam.'),(4,2,'en','General Vo Nguyen Giap (1911-2013) was the brilliant general of the Vietnam People\'s Army, known as the \"Red Napoleon\". He was the Commander-in-Chief of the Vietnam People\'s Army during the resistance wars against France and America.','General Vo Nguyen Giap commanded the Dien Bien Phu Campaign (1954) and the Ho Chi Minh Campaign (1975), making significant contributions to two historic victories of the Vietnamese nation.'),(5,19,'vi','vfdvdvsdv','vfdvd'),(6,19,'en','fdvfd','vdfvfd1mhj'),(7,18,'vi','vsdvđvds','vfdvdf'),(8,18,'en','sdvdfvd?','vdfvd'),(29,20,'vi','dădawd','ădawda'),(30,20,'en','adawda','ădawdad'),(31,21,'vi','awdwadawd','awdawdawdaw'),(32,21,'en','awdawdw','dawdawdawd'),(33,23,'vi','adwdawdawdaw','dawdawdawdwa'),(34,23,'en','adwdawdawdawdaw','dawdawdawdadawd');
/*!40000 ALTER TABLE `historicalfigurecontents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historicalfigures`
--

DROP TABLE IF EXISTS `historicalfigures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicalfigures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name_vi` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name_en` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_year` int DEFAULT NULL,
  `death_year` int DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historicalfigures`
--

LOCK TABLES `historicalfigures` WRITE;
/*!40000 ALTER TABLE `historicalfigures` DISABLE KEYS */;
INSERT INTO `historicalfigures` VALUES (1,'Hồ Chí Minh','Ho Chi Minh',1890,1969,'/uploads/hochiminh.jpg','2026-03-04 19:53:01','2026-03-04 19:53:01'),(2,'Võ Nguyên Giáp','Vo Nguyen Giap',1911,2012,'/uploads/vonguyengiap.jpg','2026-03-04 19:53:01','2026-03-31 19:10:36'),(18,'Trần Quốc Tuan','Tran Quoc Tuan',1555,1666,'/uploads/1775141912199-357122213.jpg','2026-03-31 19:14:25','2026-04-02 14:58:33'),(19,'Nguyen DInh CHinh','NDC',2003,2100,NULL,'2026-03-31 19:24:02','2026-03-31 19:24:02'),(20,'adawdawda','dădaw',1332,1333,NULL,'2026-04-03 03:47:49','2026-04-03 03:47:49'),(21,'dawdawda','dawdawda',1999,2000,NULL,'2026-04-03 03:48:06','2026-04-03 03:48:06'),(22,'dawdawdawdaw','dawdadadawda',2000,2022,NULL,'2026-04-03 03:48:26','2026-04-03 03:48:26'),(23,'dawdawdawdawdawd','dawdawdawdadawd',1900,2024,'/uploads/1775188135686-500067565.jpg','2026-04-03 03:48:57','2026-04-03 03:48:57'),(24,'adwdawdawdawd','dawdawdawdawd',1982,2026,NULL,'2026-04-03 03:50:10','2026-04-03 03:50:10');
/*!40000 ALTER TABLE `historicalfigures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historyperiods`
--

DROP TABLE IF EXISTS `historyperiods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historyperiods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period_name_vi` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_name_en` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_year` int NOT NULL,
  `end_year` int DEFAULT NULL,
  `content_vi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_en` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historyperiods`
--

LOCK TABLES `historyperiods` WRITE;
/*!40000 ALTER TABLE `historyperiods` DISABLE KEYS */;
INSERT INTO `historyperiods` VALUES (1,'Kháng chiến chống Pháp (1945-1954)','Resistance against France (1945-1954)',1945,1954,'Sau Cách mạng Tháng Tám thành công, thực dân Pháp quay lại xâm lược nước ta. Dưới sự lãnh đạo của Đảng Cộng sản Đông Dương và Chủ tịch Hồ Chí Minh, toàn dân tộc đã tiến hành cuộc kháng chiến trường kỳ 9 năm. Từ chiến tranh du kích đến chiến tranh chính quy, từ xây dựng lực lượng đến mở các chiến dịch lớn, đỉnh cao là Chiến dịch Điện Biên Phủ \"lừng lẫy năm châu, chấn động địa cầu\". Ngày 7/5/1954, quân ta giành thắng lợi hoàn toàn, buộc Pháp phải ký Hiệp định Genève ngày 21/7/1954, công nhận độc lập, chủ quyền và toàn vẹn lãnh thổ của Việt Nam, Lào, Campuchia. Chiến thắng này là minh chứng sống động cho sức mạnh của chiến tranh nhân dân, đường lối kháng chiến toàn dân, toàn diện, trường kỳ, dựa vào sức mình là chính.??','After the successful August Revolution, French colonialists returned to invade our country. Under the leadership of the Indochinese Communist Party and President Ho Chi Minh, the entire nation waged a 9-year prolonged resistance war. From guerrilla warfare to conventional warfare, from building forces to launching major campaigns, culminating in the Dien Bien Phu Campaign \"resounding throughout five continents, shaking the globe\". On May 7, 1954, our army won complete victory, forcing France to sign the Geneva Accords on July 21, 1954, recognizing the independence, sovereignty and territorial integrity of Vietnam, Laos and Cambodia. This victory was vivid proof of the power of people\'s war, the policy of nationwide, comprehensive, prolonged resistance, relying mainly on our own strength.','/uploads/khangchienchongphap.jpg','2026-03-04 19:53:01','2026-04-02 17:10:47'),(2,'Kháng chiến chống Mỹ cứu nước (1954-1975)','Resistance against America to save the country (1954-1975)',1954,1974,'Sau Hiệp định Genève, Mỹ thay chân Pháp can thiệp vào miền Nam, dựng lên chính quyền tay sai Ngô Đình Diệm. Dưới sự lãnh đạo của Đảng Lao động Việt Nam, nhân dân cả nước tiến hành cuộc kháng chiến chống Mỹ cứu nước. Miền Bắc xây dựng hậu phương lớn, miền Nam tiến hành đấu tranh chính trị kết hợp vũ trang, phát triển lực lượng cách mạng. Từ phong trào Đồng khởi (1959-1960), cao trào chống Mỹ (1961-1965), đến Tổng tiến công và nổi dậy Xuân Mậu Thân 1968, và đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử năm 1975. Ngày 30/4/1975, quân giải phóng tiến vào Sài Gòn, chính quyền Việt Nam Cộng hòa đầu hàng vô điều kiện. Cuộc kháng chiến chống Mỹ cứu nước đã hoàn toàn thắng lợi, non sông thu về một mối, cả nước bước vào kỷ nguyên hòa bình, thống nhất và xây dựng chủ nghĩa xã hội.\nSau Hiệp định Genève, Mỹ thay chân Pháp can thiệp vào miền Nam, dựng lên chính quyền tay sai Ngô Đình Diệm. Dưới sự lãnh đạo của Đảng Lao động Việt Nam, nhân dân cả nước tiến hành cuộc kháng chiến chống Mỹ cứu nước. Miền Bắc xây dựng hậu phương lớn, miền Nam tiến hành đấu tranh chính trị kết hợp vũ trang, phát triển lực lượng cách mạng. Từ phong trào Đồng khởi (1959-1960), cao trào chống Mỹ (1961-1965), đến Tổng tiến công và nổi dậy Xuân Mậu Thân 1968, và đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử năm 1975. Ngày 30/4/1975, quân giải phóng tiến vào Sài Gòn, chính quyền Việt Nam Cộng hòa đầu hàng vô điều kiện. Cuộc kháng chiến chống Mỹ cứu nước đã hoàn toàn thắng lợi, non sông thu về một mối, cả nước bước vào kỷ nguyên hòa bình, thống nhất và xây dựng chủ nghĩa xã hội.\nSau Hiệp định Genève, Mỹ thay chân Pháp can thiệp vào miền Nam, dựng lên chính quyền tay sai Ngô Đình Diệm. Dưới sự lãnh đạo của Đảng Lao động Việt Nam, nhân dân cả nước tiến hành cuộc kháng chiến chống Mỹ cứu nước. Miền Bắc xây dựng hậu phương lớn, miền Nam tiến hành đấu tranh chính trị kết hợp vũ trang, phát triển lực lượng cách mạng. Từ phong trào Đồng khởi (1959-1960), cao trào chống Mỹ (1961-1965), đến Tổng tiến công và nổi dậy Xuân Mậu Thân 1968, và đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử năm 1975. Ngày 30/4/1975, quân giải phóng tiến vào Sài Gòn, chính quyền Việt Nam Cộng hòa đầu hàng vô điều kiện. Cuộc kháng chiến chống Mỹ cứu nước đã hoàn toàn thắng lợi, non sông thu về một mối, cả nước bước vào kỷ nguyên hòa bình, thống nhất và xây dựng chủ nghĩa xã hội.\nSau Hiệp định Genève, Mỹ thay chân Pháp can thiệp vào miền Nam, dựng lên chính quyền tay sai Ngô Đình Diệm. Dưới sự lãnh đạo của Đảng Lao động Việt Nam, nhân dân cả nước tiến hành cuộc kháng chiến chống Mỹ cứu nước. Miền Bắc xây dựng hậu phương lớn, miền Nam tiến hành đấu tranh chính trị kết hợp vũ trang, phát triển lực lượng cách mạng. Từ phong trào Đồng khởi (1959-1960), cao trào chống Mỹ (1961-1965), đến Tổng tiến công và nổi dậy Xuân Mậu Thân 1968, và đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử năm 1975. Ngày 30/4/1975, quân giải phóng tiến vào Sài Gòn, chính quyền Việt Nam Cộng hòa đầu hàng vô điều kiện. Cuộc kháng chiến chống Mỹ cứu nước đã hoàn toàn thắng lợi, non sông thu về một mối, cả nước bước vào kỷ nguyên hòa bình, thống nhất và xây dựng chủ nghĩa xã hội.\nSau Hiệp định Genève, Mỹ thay chân Pháp can thiệp vào miền Nam, dựng lên chính quyền tay sai Ngô Đình Diệm. Dưới sự lãnh đạo của Đảng Lao động Việt Nam, nhân dân cả nước tiến hành cuộc kháng chiến chống Mỹ cứu nước. Miền Bắc xây dựng hậu phương lớn, miền Nam tiến hành đấu tranh chính trị kết hợp vũ trang, phát triển lực lượng cách mạng. Từ phong trào Đồng khởi (1959-1960), cao trào chống Mỹ (1961-1965), đến Tổng tiến công và nổi dậy Xuân Mậu Thân 1968, và đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử năm 1975. Ngày 30/4/1975, quân giải phóng tiến vào Sài Gòn, chính quyền Việt Nam Cộng hòa đầu hàng vô điều kiện. Cuộc kháng chiến chống Mỹ cứu nước đã hoàn toàn thắng lợi, non sông thu về một mối, cả nước bước vào kỷ nguyên hòa bình, thống nhất và xây dựng chủ nghĩa xã hội.\nSau Hiệp định Genève, Mỹ thay chân Pháp can thiệp vào miền Nam, dựng lên chính quyền tay sai Ngô Đình Diệm. Dưới sự lãnh đạo của Đảng Lao động Việt Nam, nhân dân cả nước tiến hành cuộc kháng chiến chống Mỹ cứu nước. Miền Bắc xây dựng hậu phương lớn, miền Nam tiến hành đấu tranh chính trị kết hợp vũ trang, phát triển lực lượng cách mạng. Từ phong trào Đồng khởi (1959-1960), cao trào chống Mỹ (1961-1965), đến Tổng tiến công và nổi dậy Xuân Mậu Thân 1968, và đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử năm 1975. Ngày 30/4/1975, quân giải phóng tiến vào Sài Gòn, chính quyền Việt Nam Cộng hòa đầu hàng vô điều kiện. Cuộc kháng chiến chống Mỹ cứu nước đã hoàn toàn thắng lợi, non sông thu về một mối, cả nước bước vào kỷ nguyên hòa bình, thống nhất và xây dựng chủ nghĩa xã hội.','After the Geneva Accords, the United States replaced France in intervening in the South, establishing the puppet Ngo Dinh Diem regime. Under the leadership of the Vietnam Workers\' Party, the entire nation waged the resistance war against America to save the country. The North built a great rear base, the South carried out political struggle combined with armed struggle, developing revolutionary forces. From the Dong Khoi movement (1959-1960), the anti-American high tide (1961-1965), to the Tet General Offensive and Uprising in 1968, and culminating in the Ho Chi Minh Campaign in 1975. On April 30, 1975, liberation forces entered Saigon, the Republic of Vietnam regime unconditionally surrendered. The resistance war against America to save the nation completely triumphed, the country was reunified, and the entire nation entered the era of peace, unity and socialist construction.','/uploads/khangchienchongmy.jpg','2026-03-04 19:53:01','2026-04-03 03:13:39');
/*!40000 ALTER TABLE `historyperiods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timelineevents`
--

DROP TABLE IF EXISTS `timelineevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timelineevents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_year` int NOT NULL,
  `year_display_vi` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_display_en` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_vi` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_vi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_en` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_event_year` (`event_year`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timelineevents`
--

LOCK TABLES `timelineevents` WRITE;
/*!40000 ALTER TABLE `timelineevents` DISABLE KEYS */;
INSERT INTO `timelineevents` VALUES (1,221,'221-321tcn','dădaw','dăd','ădwad','dăd','ădwad??',NULL,'2026-04-02 16:48:46','2026-04-02 17:01:40'),(2,300,'300 - 1900','eqeq','eqweq','eqwe','qưeq','eqweq',NULL,'2026-04-02 17:47:25','2026-04-02 17:47:25');
/*!40000 ALTER TABLE `timelineevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci DEFAULT 'admin',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin123','admin','2026-03-09 00:35:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 12:22:33
