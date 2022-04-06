-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 06, 2022 at 03:09 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_session_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `user_id`, `user_session_id`) VALUES
(77, 2, 'fdf8a1fc2c56b8333b11c11e6dc71cd7'),
(119, 36, '93998a96825f0fa0f61a4897e6d37602'),
(120, 36, '1f3f67c83e3795f96a935415f1cf3b2f'),
(121, 36, '0ed7c044980c9563aeda41aef66240e4'),
(122, 36, '8523ca60d6b7738a8d7ce081b17c0d71');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int NOT NULL,
  `user_name` text NOT NULL,
  `mobile_no` char(19) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` text NOT NULL,
  `user_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `user_name`, `mobile_no`, `user_email`, `user_password`) VALUES
(18, 'test4', '1212121212', 'test4@gmail.com', 'test456'),
(19, 'test4', '0909090909', 'tes674@gmail.com', 'test456'),
(34, 'nikhil', '9817298172', 'nikhil@gmail.com', 'nikhil9876'),
(35, 'htg', '9899987878', 'mikjl@gmail.com', 'bhgsfd'),
(36, 'Nikhil Chauhan', '9898989898', 'nikhil.webethics@gmail.com', 'Nikhil');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `user_name` text NOT NULL,
  `school` text NOT NULL,
  `photo` varchar(200) CHARACTER SET utf8 COLLATE utf8_croatian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_name`, `school`, `photo`) VALUES
(1, 'ram', 'klb', NULL),
(2, 'nikhil', 'klb', NULL),
(3, 'rahul', 'klb', NULL),
(4, 'mohan', 'klb', NULL),
(5, 'mohan', 'klb', NULL),
(6, 'nikhil', 'rahul', NULL),
(7, 'tested', 'testedschool', NULL),
(8, 'tested', 'testedschool', NULL),
(9, 'dfhjfh', 'fuj', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
