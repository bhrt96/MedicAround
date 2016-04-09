-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 02, 2016 at 12:29 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackathon`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE DATABASE `hackathon`;
USE `hackathon`;

CREATE TABLE IF NOT EXISTS `appointments` (
  `patient` varchar(100) NOT NULL,
  `doctor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`patient`, `doctor`) VALUES
('aditya', 'maharshi');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE IF NOT EXISTS `doctors` (
  `dr_id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `qualifications` varchar(300) DEFAULT NULL,
  `specialization` varchar(300) DEFAULT NULL,
  `experience` varchar(500) DEFAULT NULL,
  `rating` decimal(2,0) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`dr_id`, `name`, `qualifications`, `specialization`, `experience`, `rating`, `address`, `email`, `phone`) VALUES
(0, 'sfdsgsdgdsg', 'fsfsf', 'cancer', 'ndfjsjsd,sdc', '0', '', 'rgdg@gmail', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`) VALUES
('!afrgrhgrdghd', 'dfsgdhthsgf'),
('!gthfhfhfh', 'frgrhrdhdrh'),
('maharshi', 'roy');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE IF NOT EXISTS `patients` (
  `username` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` enum('M','F') NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`username`, `name`, `gender`, `address`, `phone`, `email`) VALUES
('!gthfhfhfh', 'gdgdgdfgdg', '', NULL, 2147483647, 'sgdhhthrt@dfgsjglsg.com'),
('!gthfhfhfh', 'gdgdgdfgdg', '', NULL, 2147483647, 'sgdhhthrt@dfgsjglsg.com'),
('!afrgrhgrdghd', 'grdrhgdhdth', 'M', NULL, 53453635, 'rgrdhtht@jkhk.comm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`dr_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD UNIQUE KEY `username_index` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
