-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2019 at 07:57 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_master`
--

CREATE TABLE `account_master` (
  `email_id` varchar(50) NOT NULL,
  `mobile_no` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` int(11) NOT NULL DEFAULT '0' COMMENT 'is_deleted =0 is Not deleted, else 1 is deleted',
  `full_name` varchar(150) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_master`
--

INSERT INTO `account_master` (`email_id`, `mobile_no`, `password`, `created_on`, `updated_on`, `is_deleted`, `full_name`, `user_id`, `status`) VALUES
('sachinb2193@gmail.com', '8888222180', 'd8578edf8458ce06fbc5bb76a58c5ca4', '2019-12-09 17:09:15', '2019-12-09 17:09:15', 0, 'Sachin Bahegavankar', 14, 1),
('sachin2193@gmail.com', '8888222170', 'b717415eb5e699e4989ef3e2c4e9cbf7', '2019-12-12 07:16:14', '2019-12-12 07:16:14', 0, 'Sachin Sudhir Bahegavankar', 18, 1),
('sagar7488@gmail.com', '9890052952', 'a76beaa42a7c65d1b3d49cb4757e6b91', '2019-12-12 16:36:06', '2019-12-12 16:36:06', 0, 'Sagar S. Bahegavankar', 19, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL COMMENT 'WHich user are created this details',
  `full_name` varchar(150) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` int(11) NOT NULL DEFAULT '0' COMMENT '0 is not deleted else 1 is deleted',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 is status active else deactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `created_by`, `full_name`, `created_on`, `updated_on`, `is_deleted`, `status`) VALUES
(22, NULL, 'Sagar', '2019-12-11 11:28:06', '2019-12-11 11:28:06', 0, 1),
(23, NULL, 'Sagar', '2019-12-11 11:30:39', '2019-12-11 11:30:39', 0, 1),
(24, NULL, '', '2019-12-11 11:32:34', '2019-12-11 11:32:34', 0, 1),
(25, NULL, 'Sagar', '2019-12-11 11:36:49', '2019-12-11 11:36:49', 0, 1),
(26, NULL, 'dfdsafa', '2019-12-11 11:37:32', '2019-12-11 11:37:32', 0, 1),
(27, NULL, 'studentForm', '2019-12-11 11:38:27', '2019-12-11 11:38:27', 0, 1),
(28, NULL, 'gfsdgdfsgfdg', '2019-12-11 11:39:29', '2019-12-11 11:39:29', 0, 1),
(29, NULL, 'undefined', '2019-12-11 11:57:12', '2019-12-11 11:57:12', 0, 1),
(30, NULL, 'undefined', '2019-12-11 11:58:06', '2019-12-11 11:58:06', 0, 1),
(31, NULL, 'undefined', '2019-12-11 11:58:13', '2019-12-11 11:58:13', 0, 1),
(32, NULL, 'undefined', '2019-12-11 11:58:36', '2019-12-11 11:58:36', 0, 1),
(33, NULL, 'undefined', '2019-12-11 11:59:28', '2019-12-11 11:59:28', 0, 1),
(34, NULL, 'undefined', '2019-12-11 11:59:40', '2019-12-11 11:59:40', 0, 1),
(35, NULL, 'sada', '2019-12-11 12:01:18', '2019-12-11 12:01:18', 0, 1),
(36, 14, '77', '2019-12-11 12:08:13', '2019-12-11 18:58:00', 1, 1),
(37, 14, 'Sachin S . Bahegavankar', '2019-12-11 13:18:04', '2019-12-12 07:14:19', 1, 1),
(38, 14, 'Sachin S . Bahegavankar', '2019-12-11 16:49:22', '2019-12-11 19:16:19', 0, 1),
(39, 14, 'shravan kumar patil', '2019-12-11 19:10:31', '2019-12-12 17:55:44', 0, 1),
(40, 14, 'shravan', '2019-12-11 19:15:49', '2019-12-11 19:21:28', 1, 1),
(41, 14, 'shravan kumar patil', '2019-12-12 06:07:19', '2019-12-12 06:07:19', 0, 1),
(42, 19, 'Sagar', '2019-12-12 16:37:31', '2019-12-12 16:37:31', 0, 1),
(43, 18, 'Shraan', '2019-12-12 17:47:40', '2019-12-12 17:48:11', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_saved_places`
--

CREATE TABLE `user_saved_places` (
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_master_id` int(11) NOT NULL,
  `place_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_path` varchar(200) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` int(11) NOT NULL COMMENT '0 is not deleted 1 is deleted',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 is Active Status'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_saved_places`
--

INSERT INTO `user_saved_places` (`place_id`, `user_id`, `user_master_id`, `place_name`, `description`, `image_path`, `address`, `created_on`, `updated_on`, `is_deleted`, `status`) VALUES
(1, 22, 14, 'dsfasf', 'dsafasf', '157606367759920190503_133004.jpg', 'fdsa', '2019-12-11 11:28:06', '2019-12-11 11:28:06', 0, 1),
(2, 23, 14, 'dsfasf', 'dsafasf', '157606367759920190503_133004.jpg', 'fdsa', '2019-12-11 11:30:39', '2019-12-11 11:30:39', 0, 1),
(3, 24, 14, '', '', '', '', '2019-12-11 11:32:34', '2019-12-11 11:32:34', 0, 1),
(4, 25, 14, 'fdsfas', '66', '157606378895920190503_133004.jpg', 'fsfsf', '2019-12-11 11:36:49', '2019-12-11 11:36:49', 0, 1),
(5, 26, 14, 'fdsfasfd', 'dasfasdf', '157606378895920190503_133004.jpg', 'dsfsafdasf', '2019-12-11 11:37:32', '2019-12-11 11:37:32', 0, 1),
(6, 27, 14, 'fas', 'dsfsf', '157606378895920190503_133004.jpg', 'ddfasfas', '2019-12-11 11:38:27', '2019-12-11 11:38:27', 0, 1),
(7, 28, 14, 'gfdsgdfg', 'dfgdfgdgfdfgfgdsf', '', 'gfdgdsgdfg', '2019-12-11 11:39:29', '2019-12-11 11:39:29', 0, 1),
(8, 35, 14, 'place1', 'place1', '157606559674120190503_133004.jpg', 'place1', '2019-12-11 12:01:18', '2019-12-11 12:01:18', 0, 1),
(9, 35, 14, 'place2', 'place2', '157606559674120190503_133004.jpg', 'place2', '2019-12-11 12:01:18', '2019-12-11 12:01:18', 0, 1),
(10, 36, 14, 'created_by', 'created_by', '', 'created_by', '2019-12-11 12:08:13', '2019-12-11 12:08:13', 0, 1),
(13, 38, 14, 'Bengalore', 'Bengalore IT PARK', '157607003223020190503_133004.jpg', 'Bengalore Electronic IT Park', '2019-12-11 16:49:22', '2019-12-11 16:49:22', 0, 1),
(14, 38, 14, 'Bengalore 2', 'Bengalore IT PARK 2', '157607003223020190503_133004.jpg', 'Bengalore Electronic IT Park 2', '2019-12-11 16:49:22', '2019-12-11 16:49:22', 0, 1),
(15, 39, 14, 'home', 'home', '1576091144360download (1).jpeg', 'sweet home', '2019-12-11 19:10:31', '2019-12-11 19:10:31', 0, 1),
(16, 39, 14, 'Bangalore', 'Bengalore', '1576091144360download (1).jpeg', 'Electronic city', '2019-12-11 19:10:31', '2019-12-11 19:10:31', 0, 1),
(17, 40, 14, 'kerala ', 'kerala city', '1576091144360images (16).jpeg', 'karela place', '2019-12-11 19:15:49', '2019-12-11 19:21:28', 1, 1),
(18, 40, 14, 'kerala 1', 'kerala city 1', '1576091144360download (5).jpeg', 'karela place 1', '2019-12-11 19:15:49', '2019-12-11 19:21:28', 1, 1),
(21, 39, 14, 'homes', 'homes', '1576091144360download (1).jpeg', 'sweet home', '2019-12-12 06:32:49', '2019-12-12 06:32:49', 0, 1),
(22, 39, 14, 'Bangalore', 'Bengalore', '1576091144360download (1).jpeg', 'Electronic city', '2019-12-12 06:32:49', '2019-12-12 06:32:49', 0, 1),
(40, 41, 14, 'home', 'home', '1576133231011download (5).jpeg', 'sweet home', '2019-12-12 06:49:49', '2019-12-12 06:49:49', 0, 1),
(41, 41, 14, 'Bangalore', 'Bengalore', '1576091144360download (1).jpeg', 'Electronic city', '2019-12-12 06:49:49', '2019-12-12 06:49:49', 0, 1),
(42, 41, 14, 'Bangalores', 'Bengalores', '1576091144360download (1).jpeg', 'Electronic city', '2019-12-12 06:49:49', '2019-12-12 06:49:49', 0, 1),
(43, 37, 14, 'Bengalore', 'Bengalore IT PARK', '157607003223020190503_133004.jpg', 'Bengalore Electronic IT Park', '2019-12-12 07:14:02', '2019-12-12 07:14:19', 1, 1),
(44, 37, 14, 'Bengalore 2', 'Bengalore IT PARK 2', '157607003223020190503_133004.jpg', 'Bengalore Electronic IT Park 2', '2019-12-12 07:14:02', '2019-12-12 07:14:19', 1, 1),
(45, 42, 19, 'Pune', 'Pune', '1576134826155images (16).jpeg', 'Pune MH', '2019-12-12 16:37:31', '2019-12-12 16:37:31', 0, 1),
(46, 42, 19, 'Puna', 'Puna', '1576134826155images (16).jpeg', 'Puna', '2019-12-12 16:37:31', '2019-12-12 16:37:31', 0, 1),
(47, 43, 18, 'Bengalore', 'asdasd', '1576134826155download (6).jpeg', 'Mayur ', '2019-12-12 17:47:40', '2019-12-12 17:47:40', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_master`
--
ALTER TABLE `account_master`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `mobile_no` (`mobile_no`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `user_saved_places`
--
ALTER TABLE `user_saved_places`
  ADD PRIMARY KEY (`place_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_master_id` (`user_master_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_master`
--
ALTER TABLE `account_master`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `user_saved_places`
--
ALTER TABLE `user_saved_places`
  MODIFY `place_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `account_master` (`user_id`);

--
-- Constraints for table `user_saved_places`
--
ALTER TABLE `user_saved_places`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`),
  ADD CONSTRAINT `user_master_id` FOREIGN KEY (`user_master_id`) REFERENCES `account_master` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
