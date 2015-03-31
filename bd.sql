-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 31-03-2015 a las 01:16:35
-- Versión del servidor: 5.5.38
-- Versión de PHP: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `finder`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
`id_Categorias` int(11) NOT NULL,
  `nombreCategoria` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_Categorias`, `nombreCategoria`) VALUES
(1, 'Restaurantes'),
(2, 'Bares'),
(3, 'Ocio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
`id_Establecimientos` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `celular` varchar(13) DEFAULT NULL,
  `propietario` int(11) NOT NULL,
  `lat` varchar(30) NOT NULL,
  `lng` varchar(30) NOT NULL,
  `categoria` int(11) NOT NULL,
  `localidad` varchar(80) NOT NULL,
  `estado` varchar(80) NOT NULL,
  `pais` varchar(80) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`id_Establecimientos`, `nombre`, `direccion`, `tel`, `celular`, `propietario`, `lat`, `lng`, `categoria`, `localidad`, `estado`, `pais`) VALUES
(18, 'aadsa', '3453', '', '', 1, '18.976774844560552', '-98.22010425498655', 2, 'Puebla', 'Puebla', 'México'),
(19, 'casas', '344', '', '', 1, '18.977811081600436', '-98.2215924227234', 3, 'Puebla', 'Puebla', 'México'),
(20, 'mi localito', 'aqui esta', '2233345563', '', 1, '18.981922055419556', '-98.22882531960448', 1, 'Puebla', 'Puebla', 'México'),
(22, 'otro restaurant', 'qwertt', '', '', 1, '18.981062038754768', '-98.21897446344605', 1, 'Puebla', 'Puebla', 'México'),
(23, 'Chigna', 'Centro Escolar', '7971098234', '', 1, '19.834648829802486', '-98.03598968200072', 3, 'Chignahuapan', 'Puebla', 'México'),
(25, 'Cecyte Escuela', 'De Romero Vargas s/n', '9876543210', '7979710895', 1, '19.8485179059824', '-98.03286563488768', 3, 'Chignahuapan', 'Puebla', 'México');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
`id_Usuarios` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `fechaNac` varchar(45) NOT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_Usuarios`, `nombre`, `apellidos`, `email`, `fechaNac`, `sexo`, `tipo`, `password`) VALUES
(1, 'Uriel', 'Escorcia Cortes', 'uris_ec@hotmail.com', '1991-01-19', 'hombre', 'dueño', '25d55ad283aa400af464c76d713c07ad');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
 ADD PRIMARY KEY (`id_Categorias`);

--
-- Indices de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
 ADD PRIMARY KEY (`id_Establecimientos`), ADD KEY `propietario_idx` (`propietario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
 ADD PRIMARY KEY (`id_Usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
MODIFY `id_Categorias` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
MODIFY `id_Establecimientos` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
MODIFY `id_Usuarios` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
ADD CONSTRAINT `propietarios` FOREIGN KEY (`propietario`) REFERENCES `usuarios` (`id_Usuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;
