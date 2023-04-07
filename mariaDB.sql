-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.6.7-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para music_ts
CREATE DATABASE IF NOT EXISTS `music_ts` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `music_ts`;

-- Copiando estrutura para tabela music_ts.musicas
CREATE TABLE IF NOT EXISTS `musicas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `musica` varchar(50) NOT NULL,
  `artista` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela music_ts.musicas: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `musicas` DISABLE KEYS */;
INSERT INTO `musicas` (`id`, `musica`, `artista`) VALUES
	(1, 'Do fundo da Grota', 'Baitaca'),
	(2, 'Girassóis', 'Cidadão Quem'),
	(3, 'Set Fire to the Rain', 'Adele'),
	(4, 'Treasure', 'Bruno Mars');
/*!40000 ALTER TABLE `musicas` ENABLE KEYS */;

-- Copiando estrutura para tabela music_ts.playlists
CREATE TABLE IF NOT EXISTS `playlists` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL DEFAULT 'Playlist Aleatoria',
  `id_usuario` bigint(20) unsigned NOT NULL DEFAULT 0,
  `genero` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela music_ts.playlists: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;

-- Copiando estrutura para tabela music_ts.playlists_musicas
CREATE TABLE IF NOT EXISTS `playlists_musicas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_playlist` bigint(20) unsigned NOT NULL,
  `id_musica` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_playlist` (`id_playlist`),
  KEY `id_musica` (`id_musica`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela music_ts.playlists_musicas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `playlists_musicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists_musicas` ENABLE KEYS */;

-- Copiando estrutura para tabela music_ts.token_logout
CREATE TABLE IF NOT EXISTS `token_logout` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela music_ts.token_logout: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `token_logout` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_logout` ENABLE KEYS */;

-- Copiando estrutura para tabela music_ts.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(70) NOT NULL,
  `senha` varchar(149) NOT NULL,
  `role` varchar(5) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela music_ts.usuario: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `role`) VALUES
	(14, 'admin', 'admin', '$2b$10$ftDRlTivNWKEk6RrY0yek.9/cQvFGTTWCEojjlnkgWvNJuTHR77Hm', 'ADMIN');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
