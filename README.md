# Spotify Charts

A node web app to demonstrate querying from a sql database.

Watch the demo video [here](https://youtu.be/mC8D7VYpJLM).

## Database setup

Before the webapp can be run, the sql database has to be setup using the sql scripts in *db_setup* folder.

**To run script:**

1. Use `mysql` command to start the sql terminal (in local instance),.

2. once MySQL connection is successful, use `source db_setup/0-create-db.sql` to create the database.

3. After database is created, use `source db_setup/1-create-tables.sql` to create tables.

4. After the tables are created, use `source db_setup/2-ingest-data.sql` to load data from csv into the tables.

5. Lastly, use `source db_setup/3-create-user.sql` to create a new user with SELECT privileges.

Database should now be all set!

## Instructions to run webapp

1. Ensure the database is setup following the **Database setup** instructions above.

2. Install required packages using the command `npm install`.

3. Start the web app with the command `node index.js`.

4. Navigate to the URL `localhost:3000` in the browser (or click the link in the terminal output).

The web app should now be displayed!

<img src="https://github.com/jxne00/SpotifyCharts/blob/main/src/web1.png" alt="WebAppImage">
