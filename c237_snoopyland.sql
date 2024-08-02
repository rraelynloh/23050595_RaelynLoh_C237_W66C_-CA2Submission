-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 05:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237_snoopyland`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessories`
--

CREATE TABLE `accessories` (
  `accessoriesId` int(11) NOT NULL,
  `accessoriesName` varchar(200) NOT NULL,
  `accessoriesPrice` double(10,2) NOT NULL,
  `accessoriesImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accessories`
--

INSERT INTO `accessories` (`accessoriesId`, `accessoriesName`, `accessoriesPrice`, `accessoriesImage`) VALUES
(1, 'Snoopy Happy Cap', 10.99, 'snoopy_cap.png'),
(2, 'Snoopy Walking Cap', 10.99, 'snoopy_cap2.png'),
(3, 'Snoopy Slippers', 20.99, 'snoopy_slippers.png'),
(4, 'Snoopy Scrunchie', 5.99, 'snoopy_scrunchie.png'),
(5, 'Woodstock Phone Case', 6.89, 'woodstock_case.png'),
(6, 'Charlie Brown Phone Case', 6.89, 'charlie_case.png');

-- --------------------------------------------------------

--
-- Table structure for table `charliebrown`
--

CREATE TABLE `charliebrown` (
  `charlieId` int(11) NOT NULL,
  `charlieName` varchar(200) NOT NULL,
  `charliePrice` double(10,2) NOT NULL,
  `charlieImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charliebrown`
--

INSERT INTO `charliebrown` (`charlieId`, `charlieName`, `charliePrice`, `charlieImage`) VALUES
(1, 'Charlie Brown T-Shirt', 25.50, 'charlie_shirt.png'),
(2, 'Charlie Brown Hoodie', 29.99, 'charlie_hoodie.png'),
(3, 'Charlie Brown Phone Case', 6.89, 'charlie_case.png'),
(4, 'Charlie Brown Mug', 10.99, 'charlie_mug.png'),
(5, 'Charlie Brown Glass Cup', 12.99, 'charlie_glass.png');

-- --------------------------------------------------------

--
-- Table structure for table `clothing`
--

CREATE TABLE `clothing` (
  `clothingId` int(11) NOT NULL,
  `clothingName` varchar(200) NOT NULL,
  `clothingPrice` double(10,2) NOT NULL,
  `clothingImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clothing`
--

INSERT INTO `clothing` (`clothingId`, `clothingName`, `clothingPrice`, `clothingImage`) VALUES
(1, 'Snoopy Tie Dye T-Shirt', 25.50, 'snoopy_shirt.png'),
(2, 'Snoopy Pink Sweater', 29.95, 'snoopy_sweater.png'),
(3, 'Charlie Brown T-Shirt', 25.50, 'charlie_shirt.png'),
(4, 'Charlie Brown Hoodie', 29.99, 'charlie_hoodie.png'),
(5, 'Woodstock Blue Sweater', 29.95, 'woodstock_sweater.png'),
(6, 'Woodstock Long Sleeve Shirt', 28.50, 'woodstock_longsleeve.png');

-- --------------------------------------------------------

--
-- Table structure for table `drinkware`
--

CREATE TABLE `drinkware` (
  `drinkwareId` int(11) NOT NULL,
  `drinkwareName` varchar(200) NOT NULL,
  `drinkwarePrice` double(10,2) NOT NULL,
  `drinkwareImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drinkware`
--

INSERT INTO `drinkware` (`drinkwareId`, `drinkwareName`, `drinkwarePrice`, `drinkwareImage`) VALUES
(1, 'Snoopy Love Mug', 10.99, 'snoopy_mug.png'),
(2, 'Snoopy Glass Cup', 12.99, 'snoopy_glass.png'),
(3, 'Charlie Brown Mug', 10.99, 'charlie_mug.png'),
(4, 'Charlie Brown Glass Cup', 12.99, 'charlie_glass.png'),
(5, 'Woodstock Mug', 10.99, 'woodstock_mug.png'),
(6, 'Woodstock Glass Cup', 12.99, 'woodstock_glass.png');

-- --------------------------------------------------------

--
-- Table structure for table `newarrival`
--

CREATE TABLE `newarrival` (
  `newarrivalId` int(11) NOT NULL,
  `newarrivalName` varchar(200) NOT NULL,
  `newarrivalPrice` double(10,2) NOT NULL,
  `newarrivalImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newarrival`
--

INSERT INTO `newarrival` (`newarrivalId`, `newarrivalName`, `newarrivalPrice`, `newarrivalImage`) VALUES
(1, 'Snoopy Blue Sweater', 29.95, 'snoopy_new.png'),
(2, 'Snoopy & Woodstock Necklace', 30.89, 'snoopy_new6.png'),
(3, 'Snoopy Earrings', 30.89, 'snoopy_new3.png'),
(4, 'Snoopy USA Cap', 10.99, 'snoopy_new2.png'),
(5, 'Snoopy Water Bottle', 15.99, 'snoopy_new4.png'),
(6, 'Snoopy & Woodstock Funko Pop!', 21.99, 'snoopy_new5.png');

-- --------------------------------------------------------

--
-- Table structure for table `snoopy`
--

CREATE TABLE `snoopy` (
  `snoopyId` int(11) NOT NULL,
  `snoopyName` varchar(200) NOT NULL,
  `snoopyPrice` double(10,2) NOT NULL,
  `snoopyImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `snoopy`
--

INSERT INTO `snoopy` (`snoopyId`, `snoopyName`, `snoopyPrice`, `snoopyImage`) VALUES
(1, 'Snoopy Tie Die T-Shirt', 25.50, 'snoopy_shirt.png'),
(2, 'Snoopy Pink Sweater', 29.95, 'snoopy_sweater.png'),
(3, 'Snoopy Happy Cap', 10.99, 'snoopy_cap.png'),
(4, 'Snoopy Slippers', 20.99, 'snoopy_slippers.png'),
(5, 'Snoopy Scrunchie', 5.99, 'snoopy_scrunchie.png'),
(6, 'Snoopy Love Mug', 10.99, 'snoopy_mug.png'),
(7, 'Snoopy Glass Cup', 12.99, 'snoopy_glass.png');

-- --------------------------------------------------------

--
-- Table structure for table `woodstock`
--

CREATE TABLE `woodstock` (
  `woodstockId` int(11) NOT NULL,
  `woodstockName` varchar(200) NOT NULL,
  `woodstockPrice` double(10,2) NOT NULL,
  `woodstockImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `woodstock`
--

INSERT INTO `woodstock` (`woodstockId`, `woodstockName`, `woodstockPrice`, `woodstockImage`) VALUES
(1, 'Woodstock Long Sleeve Shirt', 28.50, 'woodstock_longsleeve.png'),
(2, 'Woodstock Blue Sweater', 29.95, 'woodstock_sweater.png'),
(3, 'Woodstock Phone Case', 6.89, 'woodstock_case.png'),
(4, 'Woodstock Mug', 10.99, 'woodstock_mug.png'),
(5, 'Woodstock Glass Cup', 12.99, 'woodstock_glass.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`accessoriesId`);

--
-- Indexes for table `charliebrown`
--
ALTER TABLE `charliebrown`
  ADD PRIMARY KEY (`charlieId`);

--
-- Indexes for table `clothing`
--
ALTER TABLE `clothing`
  ADD PRIMARY KEY (`clothingId`);

--
-- Indexes for table `drinkware`
--
ALTER TABLE `drinkware`
  ADD PRIMARY KEY (`drinkwareId`);

--
-- Indexes for table `newarrival`
--
ALTER TABLE `newarrival`
  ADD PRIMARY KEY (`newarrivalId`);

--
-- Indexes for table `snoopy`
--
ALTER TABLE `snoopy`
  ADD PRIMARY KEY (`snoopyId`);

--
-- Indexes for table `woodstock`
--
ALTER TABLE `woodstock`
  ADD PRIMARY KEY (`woodstockId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accessories`
--
ALTER TABLE `accessories`
  MODIFY `accessoriesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `charliebrown`
--
ALTER TABLE `charliebrown`
  MODIFY `charlieId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `clothing`
--
ALTER TABLE `clothing`
  MODIFY `clothingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `drinkware`
--
ALTER TABLE `drinkware`
  MODIFY `drinkwareId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `newarrival`
--
ALTER TABLE `newarrival`
  MODIFY `newarrivalId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `snoopy`
--
ALTER TABLE `snoopy`
  MODIFY `snoopyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `woodstock`
--
ALTER TABLE `woodstock`
  MODIFY `woodstockId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
