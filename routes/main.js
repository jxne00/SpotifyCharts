/* function that returns sql query based on table name */
const getQuery = (tablename) => {
  let myquery;
  switch (tablename) {
    case 'artist':
      myquery = `SELECT * FROM artist LIMIT 300;`;
      break;
    case 'genre':
      myquery = `SELECT * FROM genre LIMIT 300;`;
      break;
    case 'artist_genre':
      myquery = `
        SELECT 
          artist.artist_name AS "Artist Name",
          GROUP_CONCAT(genre.genre_name) AS "Associated genres"
        FROM artist_genre
        JOIN artist ON artist_genre.artist_id = artist.artist_id
        JOIN genre ON artist_genre.genre_id = genre.genre_id
        GROUP BY artist_genre.artist_id
        LIMIT 300;
      `;
      break;
    case 'track':
      myquery = `
        SELECT *, 
          CASE 
            WHEN is_explicit = 1 
            THEN 'Yes' ELSE 'No' 
          END AS is_explicit
        FROM track
        LIMIT 300;
      `;
      break;
    case 'track_artist':
      myquery = `
        SELECT 
          track.track_name AS "Track Name",
          GROUP_CONCAT(artist.artist_name) AS "Artists"
        FROM track_artist
        JOIN track ON track_artist.track_id = track.track_id
        JOIN artist ON track_artist.artist_id = artist.artist_id
        GROUP BY track.track_name
        ORDER BY track.track_name DESC
        LIMIT 300;
      `;
      break;
    case 'country':
      myquery = `SELECT * FROM country LIMIT 300;`;
      break;
    case 'chart':
      myquery = `
        SELECT *, DATE_FORMAT(entry_date, '%Y-%m-%d') AS "entry_date" 
        FROM chart 
        LIMIT 300;
      `;
      break;
    default:
      return;
  }
  return myquery;
};

module.exports = (app, db) => {
  /* main page: displays all columns from all tables by default */
  app.get('/', (req, res) => {
    let myquery = `
      SELECT 
        track.track_name as "Track Name",
        GROUP_CONCAT(DISTINCT artist.artist_name) AS "Artist(s)",
        GROUP_CONCAT(DISTINCT genre.genre_name) AS "Artist's genre"
      FROM track_artist
      JOIN track ON track_artist.track_id = track.track_id
      JOIN artist ON track_artist.artist_id = artist.artist_id
      JOIN artist_genre ON artist.artist_id = artist_genre.artist_id
      JOIN genre ON artist_genre.genre_id = genre.genre_id
      WHERE genre.genre_name != 'Unknown'
      GROUP BY track.track_id
      HAVING COUNT(DISTINCT genre.genre_name) < 4
      LIMIT 300;
    `; // limit to 300 to reduce lag

    db.query(myquery, (err, result) => {
      if (!err) {
        db.query('SHOW TABLES', (err, res2) => {
          if (!err) {
            // get all table names
            const tablenames = res2.map((row) => Object.values(row)[0]);

            res.render('index.html', {
              title: 'Spotify Charts Database',
              queryused: myquery,
              tableData: result,
              tablenames,
            });
          } else throw err;
        });
      } else throw err;
    });
  });

  /* re-render the page with data from the selected table */
  app.post('/', (req, res) => {
    var tableSelected = req.body.userOption;

    // get sql query from function
    let myquery = getQuery(tableSelected);

    db.query(myquery, (err, result) => {
      if (!err) {
        db.query('SHOW TABLES', (err, res2) => {
          if (!err) {
            // get the table names
            const tablenames = res2.map((row) => Object.values(row)[0]);

            res.render('index.html', {
              title: 'Table: ' + tableSelected,
              queryused: myquery,
              tableData: result,
              tablenames,
            });
          } else throw err;
        });
      } else throw err;
    });
  });

  /* render page displaying E/R model and Relational Schema */
  app.get('/models', (req, res) => {
    res.render('models.html', { title: "Diagrams" });
  });

  /* return results that answers question 1
  "Which tracks topped the charts the most number of times, and who are the artists featured on those tracks?" */
  app.get('/question1', (req, res) => {
    let myquery = `
      SELECT 
          track.track_name, 
          COUNT(chart.track_id) AS "numTimes",
          GROUP_CONCAT(DISTINCT artist.artist_name) AS "Artists"
      FROM chart
      JOIN track ON chart.track_id = track.track_id
      JOIN track_artist ON track.track_id = track_artist.track_id
      JOIN artist ON track_artist.artist_id = artist.artist_id
      WHERE chart.position = 1
      GROUP BY chart.track_id
      ORDER BY 2 DESC
      LIMIT 300;
    `;
    db.query(myquery, (err, result) => {
      if (!err) {
        res.render('question1.html', {
          tableData: result,
          queryused: myquery,
          title: "Question One",
          question: "Which tracks topped the charts the most number of times, and who are the artists featured on those tracks?",
        });
      }
      else throw err;
    });
  });

  /* return results that answers question 2 */
  app.get('/question2', (req, res) => {
    let myquery = `
      SELECT 
        artist.artist_name AS "name", 
        SUM(chart.streams) AS "streams",
        GROUP_CONCAT(DISTINCT genre.genre_name) AS "genres"
      FROM artist
      JOIN artist_genre ON artist.artist_id = artist_genre.artist_id
      JOIN genre ON artist_genre.genre_id = genre.genre_id
      JOIN track_artist ON artist.artist_id = track_artist.artist_id
      JOIN track ON track_artist.track_id = track.track_id
      JOIN chart ON track.track_id = chart.track_id
      WHERE YEAR(chart.entry_date) = 2021
      AND MONTH(chart.entry_date) < 5
      GROUP BY artist.artist_id
      ORDER BY 2 DESC
      LIMIT 300;
    `;
    db.query(myquery, (err, result) => {
      if (!err) {
        res.render('question2.html', {
          tableData: result,
          queryused: myquery,
          title: "Question Two",
          question: "What are the genres of the artists with the highest number of total streams in the first quarter of 2021?",
        });
      } else throw err;
    });
  });

  /* return results that answers question 3 */
  app.get('/question3', (req, res) => {
    let myquery = `
      SELECT
        country.country_name,
        CONCAT(
          'Explicit: ',
            SUM(CASE WHEN track.is_explicit = 1 THEN chart.streams ELSE 0 END),
          ' || ',
          'Non-Explicit: ',
            SUM(CASE WHEN track.is_explicit = 0 THEN chart.streams ELSE 0 END)
        ) AS "streams"
      FROM track
      JOIN chart ON track.track_id = chart.track_id
      JOIN country ON chart.country_code = country.country_code
      WHERE YEAR(chart.entry_date) = 2022
      GROUP BY country.country_code;
    `;
    db.query(myquery, (err, result) => {
      if (!err) {
        res.render('question3.html', {
          tableData: result,
          queryused: myquery,
          title: "Question Three",
          question: "Between explicit and non-explicit tracks, which one generally has more streams?"
            + "Is this consistent throughout all countries?",
        });
      } else throw err;
    });
  });
};
