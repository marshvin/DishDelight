const express = require('express');
const pg = require('pg');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//connect to postgresql database
const connect = "postgres://postgres:1234@localhost/Recipedb";
const client = new pg.Client(connect);

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }
  console.log('Connected to PostgreSQL database!');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Create a 'public' folder for stylesheets and other static files

// Update the rendering route for the search page
app.get('/', (req, res) => {
  res.render('index', { recipes: [] }); // Initialize with an empty array for recipes
});

// Modify the AJAX route to /search
app.get('/search', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const result = await client.query(
      `SELECT * FROM recipes WHERE Ingredients ILIKE $1`,
      [`%${searchQuery}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
