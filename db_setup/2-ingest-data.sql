-- Ingest data from CSV into respective database tables --

LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Artist.csv"
INTO TABLE artist 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Genre.csv"
INTO TABLE genre 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Artist_Genre.csv"
INTO TABLE artist_genre 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Track.csv"
INTO TABLE track
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;
  
LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Track_Artist.csv"
INTO TABLE track_artist 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Country.csv"
INTO TABLE country 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE "/home/coder/project/db_setup/csv_data/Chart.csv"
INTO TABLE chart 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;