-- Creates database tables with fields --

DROP TABLE IF EXISTS artist_genre;
DROP TABLE IF EXISTS track_artist;
DROP TABLE IF EXISTS chart;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS track;
DROP TABLE IF EXISTS country;

CREATE TABLE artist (
    artist_id INT PRIMARY KEY,
    artist_name VARCHAR(100)
);

CREATE TABLE genre (
    genre_id INT PRIMARY KEY,
    genre_name VARCHAR(100)
);

CREATE TABLE artist_genre (
    artist_id INT,
    genre_id INT,
    PRIMARY KEY (artist_id, genre_id),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id),
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE track (
    track_id VARCHAR(62) PRIMARY KEY,
    track_name VARCHAR(255),
    duration INT,
    is_explicit BOOLEAN
);

CREATE TABLE track_artist (
    track_id VARCHAR(62),
    artist_id INT,
    PRIMARY KEY (track_id, artist_id),
    FOREIGN KEY (track_id) REFERENCES track(track_id),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

CREATE TABLE country (
    country_code CHAR(2) PRIMARY KEY,
    country_name VARCHAR(255)
);

CREATE TABLE chart (
    entry_date DATE,
    track_id VARCHAR(62),
    country_code CHAR(2),
    position INT,
    streams INT,
    PRIMARY KEY (entry_date, track_id, country_code),
    FOREIGN KEY (track_id) REFERENCES track (track_id),
    FOREIGN KEY (country_code) REFERENCES country (country_code)
);

SHOW TABLES;