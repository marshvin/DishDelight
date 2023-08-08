var express = require('express');
var consolidate = require('consolidate');
var dust = require('dustjs-linkedin');
var pg = require('pg');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// PostgreSQL database configuration
var connect = "postgres://postgres:1234@localhost/Recipedb";

// Create a new PostgreSQL client instance
var client = new pg.Client(connect);

// Connect to the PostgreSQL database
client.connect(function (err) {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }
  console.log('Connected to PostgreSQL database!');
});

// Set Dust as the template engine
app.engine('dust', consolidate.dust);

// Set the template directory (optional, if your templates are in a different directory)
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to use Dust
app.set('view engine', 'dust');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  const ingredient1 = req.query.ingredient1;
  const ingredient2 = req.query.ingredient2;
  const ingredient3 = req.query.ingredient3;

  if (ingredient1 && ingredient2 && ingredient3) {
    // If ingredients are provided, fetch recipes based on the search
    const query = `
      SELECT name, ingredients, directions
      FROM recipes
      WHERE ingredients ILIKE '%${ingredient1}%' AND ingredients ILIKE '%${ingredient2}%' AND ingredients ILIKE '%${ingredient3}%'
    `;
    client.query(query, function (err, result) {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      res.render('index', { recipes: result.rows });
    });
  } else {
    // If no ingredients provided, fetch all recipes
    client.query('SELECT name, ingredients, directions FROM recipes', function (err, result) {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      res.render('index', { recipes: result.rows });
    });
  }
});


// Add the app.listen() method to specify the port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
