const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node MySQL Social App REST API",
      description: `API endpoints for a social media application documented on swagger. 
        \n\n[GitHub Repository](https://github.com/carpodok/node-mysql-social-app)`,
      contact: {
        name: "Ali Talha ÇOBAN",
        email: "cobanalitalha@gmail.com",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server",
      },
      {
        url: "<your live url here>",
        description: "Live server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
