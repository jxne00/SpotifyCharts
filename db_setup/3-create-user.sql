-- Create user and grant SELECT privileges --

DROP USER IF EXISTS webappuser;
CREATE USER webappuser IDENTIFIED BY 'hellothere';

GRANT SELECT ON SpotifyCharts.artist TO 'webappuser';
GRANT SELECT ON SpotifyCharts.genre TO 'webappuser';
GRANT SELECT ON SpotifyCharts.artist_genre TO 'webappuser';
GRANT SELECT ON SpotifyCharts.track TO 'webappuser';
GRANT SELECT ON SpotifyCharts.track_artist TO 'webappuser';
GRANT SELECT ON SpotifyCharts.country TO 'webappuser';
GRANT SELECT ON SpotifyCharts.chart TO 'webappuser';

