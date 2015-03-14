-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 13-03-2015 a las 16:14:30
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
`id_Establecimientos` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `otro` varchar(45) DEFAULT NULL,
  `coordenadas` varchar(45) NOT NULL,
  `propietario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_Establecimiento_Categoria`
--

CREATE TABLE `rel_Establecimiento_Categoria` (
`id_Rel_Establecimiento_Categoria` int(11) NOT NULL,
  `establecimiento` int(11) NOT NULL,
  `categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Indices de la tabla `rel_Establecimiento_Categoria`
--
ALTER TABLE `rel_Establecimiento_Categoria`
 ADD PRIMARY KEY (`id_Rel_Establecimiento_Categoria`), ADD KEY `categoria_idx` (`categoria`), ADD KEY `establecimientos_idx` (`establecimiento`);

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
MODIFY `id_Categorias` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
MODIFY `id_Establecimientos` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `rel_Establecimiento_Categoria`
--
ALTER TABLE `rel_Establecimiento_Categoria`
MODIFY `id_Rel_Establecimiento_Categoria` int(11) NOT NULL AUTO_INCREMENT;
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

--
-- Filtros para la tabla `rel_Establecimiento_Categoria`
--
ALTER TABLE `rel_Establecimiento_Categoria`
ADD CONSTRAINT `categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id_Categorias`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `establecimientos` FOREIGN KEY (`establecimiento`) REFERENCES `establecimientos` (`id_Establecimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION;
