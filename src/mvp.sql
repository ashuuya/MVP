-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 11 2023 г., 13:47
-- Версия сервера: 10.4.27-MariaDB
-- Версия PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mvp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `title` varchar(512) NOT NULL,
  `skills` varchar(1024) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `date_of_foundation` varchar(32) NOT NULL,
  `slogan` varchar(128) NOT NULL,
  `goal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `clubs`
--

INSERT INTO `clubs` (`id`, `title`, `skills`, `description`, `date_of_foundation`, `slogan`, `goal`) VALUES
(3, 'Клуб водной стрельбы носками', 'Дышать под водой', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum nisi eget eros placerat, sed lobortis dui lobortis. ', '01.01.2007', 'Заплывай', 'Забить в лунку'),
(4, 'Клуб идущих домой', 'Уходить домой', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum nisi eget eros placerat, sed lobortis dui lobortis. Curabitur in dolor sit amet massa volutpat convallis ac in ligula. Nulla volutpat aliquet gravida. Donec id sodales mauris. Praesent lorem justo, cursus nec auctor id, aliquam eget ipsum. Morbi finibus aliquet diam, sed tristique urna tincidunt ac. Integer ac odio interdum, gravida nibh sed, aliquet nisl.', '05.07.2013', '«Возвращаюсь домой»', 'Уйти домой');

-- --------------------------------------------------------

--
-- Структура таблицы `docs`
--

CREATE TABLE `docs` (
  `id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_med` tinyint(1) NOT NULL DEFAULT 0,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `id_clubs` int(11) NOT NULL,
  `id_students` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `update_date` date NOT NULL,
  `clubname` varchar(512) NOT NULL,
  `studname` varchar(255) NOT NULL,
  `is_trial` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `forms`
--

INSERT INTO `forms` (`id`, `id_clubs`, `id_students`, `creation_date`, `update_date`, `clubname`, `studname`, `is_trial`) VALUES
(1, 4, 1, '0000-00-00', '0000-00-00', '', '', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `logclass`
--

CREATE TABLE `logclass` (
  `id` int(11) NOT NULL,
  `id_students` int(11) NOT NULL,
  `studgroups_id` int(11) NOT NULL,
  `id_managers` int(11) NOT NULL,
  `students_fio` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `attendance` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `logclub`
--

CREATE TABLE `logclub` (
  `id` int(11) NOT NULL,
  `id_clubs` int(11) NOT NULL,
  `id_managers` int(11) NOT NULL,
  `id_students` int(11) NOT NULL,
  `students_fio` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `attendance` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `managers`
--

CREATE TABLE `managers` (
  `id` int(11) NOT NULL,
  `campus_id` int(11) NOT NULL,
  `api_token` varchar(512) DEFAULT NULL,
  `fio` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `is_root` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `managers`
--

INSERT INTO `managers` (`id`, `campus_id`, `api_token`, `fio`, `email`, `phone`, `is_root`) VALUES
(1, 0, NULL, 'Бласковиц Гжегож', 'adcas@mail.ru', '5474575', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `managers in clubs`
--

CREATE TABLE `managers in clubs` (
  `id` int(11) NOT NULL,
  `id_clubs` int(11) NOT NULL,
  `id_managers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(1024) NOT NULL,
  `clubs_id` int(11) NOT NULL,
  `managers_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `campus_id` int(11) NOT NULL,
  `api_token` varchar(512) DEFAULT NULL,
  `fio` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `course` int(11) NOT NULL,
  `studgroup_id` int(11) NOT NULL,
  `is_member` tinyint(1) NOT NULL DEFAULT 0,
  `healthgroup` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`id`, `campus_id`, `api_token`, `fio`, `email`, `phone`, `course`, `studgroup_id`, `is_member`, `healthgroup`) VALUES
(1, 0, '12345', 'Садовникова Мария Ивановна', 'sadownikovamarya@yandex.ru', '79999999999', 4, 1, 0, 'Основная'),
(2, 0, '32454576', 'Горбенко Николя', 'energetik@gmail.com', '79999999999', 4, 1, 0, 'Основная');

-- --------------------------------------------------------

--
-- Структура таблицы `studgroups`
--

CREATE TABLE `studgroups` (
  `id` int(32) NOT NULL,
  `groupname` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `studgroups`
--

INSERT INTO `studgroups` (`id`, `groupname`) VALUES
(1, 'ИСТб-19-1'),
(2, 'ИСТб-19-2');

-- --------------------------------------------------------

--
-- Структура таблицы `weekday`
--

CREATE TABLE `weekday` (
  `id` int(11) NOT NULL,
  `dayname` varchar(64) NOT NULL,
  `time_start` varchar(30) NOT NULL,
  `time_end` varchar(30) NOT NULL,
  `placename` varchar(255) NOT NULL,
  `clubs_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `docs`
--
ALTER TABLE `docs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Индексы таблицы `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_clubs` (`id_clubs`),
  ADD KEY `id_students` (`id_students`);

--
-- Индексы таблицы `logclass`
--
ALTER TABLE `logclass`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_students` (`id_students`),
  ADD KEY `studgroups_id` (`studgroups_id`),
  ADD KEY `id_managers` (`id_managers`);

--
-- Индексы таблицы `logclub`
--
ALTER TABLE `logclub`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_clubs` (`id_clubs`),
  ADD KEY `id_managers` (`id_managers`),
  ADD KEY `id_students` (`id_students`);

--
-- Индексы таблицы `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `managers in clubs`
--
ALTER TABLE `managers in clubs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_clubs` (`id_clubs`),
  ADD KEY `id_managers` (`id_managers`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clubs_id` (`clubs_id`),
  ADD KEY `managers_id` (`managers_id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studgroup_id` (`studgroup_id`);

--
-- Индексы таблицы `studgroups`
--
ALTER TABLE `studgroups`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `weekday`
--
ALTER TABLE `weekday`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dayname` (`dayname`),
  ADD KEY `clubs_id` (`clubs_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `docs`
--
ALTER TABLE `docs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `logclass`
--
ALTER TABLE `logclass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `logclub`
--
ALTER TABLE `logclub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `managers`
--
ALTER TABLE `managers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `managers in clubs`
--
ALTER TABLE `managers in clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `studgroups`
--
ALTER TABLE `studgroups`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `weekday`
--
ALTER TABLE `weekday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `docs`
--
ALTER TABLE `docs`
  ADD CONSTRAINT `docs_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `students` (`id`);

--
-- Ограничения внешнего ключа таблицы `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`id_clubs`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `forms_ibfk_2` FOREIGN KEY (`id_students`) REFERENCES `students` (`id`);

--
-- Ограничения внешнего ключа таблицы `logclass`
--
ALTER TABLE `logclass`
  ADD CONSTRAINT `logclass_ibfk_1` FOREIGN KEY (`id_managers`) REFERENCES `managers` (`id`),
  ADD CONSTRAINT `logclass_ibfk_2` FOREIGN KEY (`id_students`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `logclass_ibfk_3` FOREIGN KEY (`studgroups_id`) REFERENCES `studgroups` (`id`);

--
-- Ограничения внешнего ключа таблицы `logclub`
--
ALTER TABLE `logclub`
  ADD CONSTRAINT `logclub_ibfk_1` FOREIGN KEY (`id_clubs`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `logclub_ibfk_2` FOREIGN KEY (`id_managers`) REFERENCES `managers` (`id`),
  ADD CONSTRAINT `logclub_ibfk_3` FOREIGN KEY (`id_students`) REFERENCES `students` (`id`);

--
-- Ограничения внешнего ключа таблицы `managers in clubs`
--
ALTER TABLE `managers in clubs`
  ADD CONSTRAINT `managers in clubs_ibfk_1` FOREIGN KEY (`id_clubs`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `managers in clubs_ibfk_2` FOREIGN KEY (`id_managers`) REFERENCES `managers` (`id`);

--
-- Ограничения внешнего ключа таблицы `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`clubs_id`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`managers_id`) REFERENCES `managers` (`id`);

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`studgroup_id`) REFERENCES `studgroups` (`id`);

--
-- Ограничения внешнего ключа таблицы `weekday`
--
ALTER TABLE `weekday`
  ADD CONSTRAINT `weekday_ibfk_1` FOREIGN KEY (`clubs_id`) REFERENCES `clubs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
