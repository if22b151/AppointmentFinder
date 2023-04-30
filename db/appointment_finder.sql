-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Apr 2023 um 19:58
-- Server-Version: 10.4.25-MariaDB
-- PHP-Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `appointment_finder`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `deadline` date NOT NULL,
  `location` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `title`, `deadline`, `location`) VALUES
(1, 'Party', '2023-02-03', 'Pauls Place'),
(2, 'Funeral', '2023-05-10', 'Cemetery');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chosen_dt`
--

CREATE TABLE `chosen_dt` (
  `fk_pers_id` int(11) NOT NULL,
  `fk_pdt_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `chosen_dt`
--

INSERT INTO `chosen_dt` (`fk_pers_id`, `fk_pdt_id`) VALUES
(1, 2),
(1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person`
--

CREATE TABLE `person` (
  `pers_id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `fk_appointment_id` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `person`
--

INSERT INTO `person` (`pers_id`, `name`, `fk_appointment_id`, `comment`) VALUES
(1, 'Paul', 1, 'yolo');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `possible_date_time`
--

CREATE TABLE `possible_date_time` (
  `pdt_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `starting_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `fk_appointment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `possible_date_time`
--

INSERT INTO `possible_date_time` (`pdt_id`, `date`, `starting_time`, `closing_time`, `fk_appointment_id`) VALUES
(1, '2023-04-24', '18:00:00', '21:00:00', 1),
(2, '2023-04-25', '18:00:00', '22:00:00', 1),
(3, '2023-06-06', '19:30:00', '24:00:00', 2),
(4, '2023-06-08', '19:30:00', '24:00:00', 2),
(5, '2023-06-10', '18:00:00', '24:00:00', 1),
(6, '2023-06-10', '19:00:00', '23:00:00', 2),
(9, '2023-06-24', '19:00:00', '23:00:00', 2);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indizes für die Tabelle `chosen_dt`
--
ALTER TABLE `chosen_dt`
  ADD KEY `fk_pdt_id` (`fk_pdt_id`),
  ADD KEY `fk_pers_id` (`fk_pers_id`);

--
-- Indizes für die Tabelle `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`pers_id`),
  ADD KEY `fk_appointment_id` (`fk_appointment_id`);

--
-- Indizes für die Tabelle `possible_date_time`
--
ALTER TABLE `possible_date_time`
  ADD PRIMARY KEY (`pdt_id`),
  ADD KEY `fk_appointment_id` (`fk_appointment_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `person`
--
ALTER TABLE `person`
  MODIFY `pers_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `possible_date_time`
--
ALTER TABLE `possible_date_time`
  MODIFY `pdt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `chosen_dt`
--
ALTER TABLE `chosen_dt`
  ADD CONSTRAINT `chosen_dt_ibfk_1` FOREIGN KEY (`fk_pdt_id`) REFERENCES `possible_date_time` (`pdt_id`),
  ADD CONSTRAINT `chosen_dt_ibfk_2` FOREIGN KEY (`fk_pers_id`) REFERENCES `person` (`pers_id`);

--
-- Constraints der Tabelle `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`fk_appointment_id`) REFERENCES `appointment` (`appointment_id`);

--
-- Constraints der Tabelle `possible_date_time`
--
ALTER TABLE `possible_date_time`
  ADD CONSTRAINT `possible_date_time_ibfk_1` FOREIGN KEY (`fk_appointment_id`) REFERENCES `appointment` (`appointment_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
