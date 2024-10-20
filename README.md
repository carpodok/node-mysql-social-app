# Node MySQL Social App
This project is a RESTful API for a social media platform built using Node.js and MySQL. It supports user authentication with JWT and provides core social media functionalities like user management, posting, and interactions (followers). 
The project follows a structured MVC architecture, with routes, controllers, and configuration files.
Additionally, Swagger is used for documenting the API. This repository is designed to offer scalable and maintainable solutions for social media applications.

## Endpoints

Below is an overview of the available endpoints and their functionalities.

- To explore the Swagger UI schema and view available endpoints, navigate to http://localhost:3000/api-docs after running the server.
- You can also test these endpoints via this [Postman](https://martian-meteor-939359.postman.co/workspace/alitalhacoban-public-workspace~6633d43a-18bb-4f4d-84e1-94a76d318225/collection/18754010-93d1eb51-323f-4bdf-94ae-97623518517c?action=share&creator=18754010&active-environment=18754010-aa866eb4-8070-4788-a35f-9e6945d54ce3) collection
<br>

![auth](https://github.com/user-attachments/assets/b808c577-f563-402d-b2a7-b02858a6155d)
![comments](https://github.com/user-attachments/assets/598c5cb1-c586-43bb-8278-b84b9322d9fb)
![likes](https://github.com/user-attachments/assets/bb24ee60-0416-44d9-8f34-faf026a10b7e)
![posts](https://github.com/user-attachments/assets/4dc29db5-f41f-4edd-b7e2-119712f6f391)
![relationships](https://github.com/user-attachments/assets/4ceb445d-1419-4964-b868-06f19b4ca5df)
![stories](https://github.com/user-attachments/assets/814a9c62-c56a-41d8-b802-952acffd742a)
![users](https://github.com/user-attachments/assets/d25eea1e-08ea-4f45-991a-d7b813212f55)


## Key Features

 This project implements the following key features to ensure a robust, secure, and scalable web application:

- `CRUD Operation`: Full implementation of Create, Read, Update, and Delete functionalities for users, posts, stories and interactions.
- `JWT-Based Authentication:` Secure user authentication using JSON Web Tokens (JWT) to manage user sessions.
- `Password Hashing`: Secure password storage with hashing using the `bcryptjs` package.
- `Server-Side Validation`: Input validation using the `express-validator` package to ensure data integrity and security.
- `Pagination`: Implemented pagination for efficient result retrieval in larger datasets.
- `API Documentation`: Integrated `Swagger` for easy and structured API documentation, improving developer experience and collaboration.


 ## Installation
  1. Clone the repository
  
  ```bash
    git clone https://github.com/carpodok/node-mysql-social-app.git
  ```
  
  2. Navigate to the project directory:
  
   ```bash
    cd node-mysql-social-app
   ```

  3. Install required dependencies
  
  ```bash
   npm install
  ```
<br>

## Configuration

1. Creat a `.env` file on the root of the project and add the following environment variables.

```
PORT=3000
JWT_SECRET ="your-jwt-secret"

DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "your-mysql-password"
DB_NAME="your-db-name"
```

<br>

## Running the Application

1. To start the server, run the following command on the root of the project path;

```
npm start
```

For the development purpose;
```
npm run dev
```

2. The application will be running on  `http://localhost:3000`

<br>



## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.


## License
This project is licensed under the MIT License.




