# Meals Recommender

The Meals Recommender is a web application that provides recipes and directions for preparing dishes based on three ingredients entered by the user. It leverages the following technologies:

- **Node.js**: A JavaScript runtime used for building server-side applications.
- **Express.js**: A web application framework for Node.js that simplifies building RESTful APIs and handling HTTP requests.
- **PostgreSQL**: A powerful open-source relational database management system used for storing recipe data.
- **REST API**: The application implements a RESTful API to fetch recipes based on user input.
- **Dust**: A lightweight templating engine for rendering dynamic content on the server-side.
- **Body Parser**: A middleware for parsing incoming request bodies in Express.js.

## Installation

- `views/`: Contains the Dust template (`index.dust`) for rendering the HTML content.
- `public/`: Holds static assets such as CSS (`styles.css`) and client-side JavaScript (`script.js`).
- `index.js`: The main Express application file that handles routing and interaction with the database.
- `package.json`: Lists project dependencies and metadata.
