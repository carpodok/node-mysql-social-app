# 👥 Social Media App

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth%20Tokens-000000?logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-85EA2D?logo=swagger&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-Testing-FF6C37?logo=postman&logoColor=white)

## 📖 Overview

 **Node MySQL Social App** is a **RESTful API** for a social media platform built using **Node.js** and **MySQL**.  
It supports user authentication with **JWT** and provides core social media functionalities:  

- 👤 User management  
- 📝 Posting system  
- 💬 Comments  
- ❤️ Likes  
- 🔗 Followers (Relationships)  
- 📖 Stories  

 The project follows an **MVC architecture** with organized routes, controllers, and configs.  
 API documentation is available via **Swagger**.

## 🚀 Endpoints

- **Swagger UI**: `http://localhost:3000/api-docs`  
- **Postman Collection**: [Here](https://martian-meteor-939359.postman.co/workspace/alitalhacoban-public-workspace~6633d43a-18bb-4f4d-84e1-94a76d318225/collection/18754010-93d1eb51-323f-4bdf-94ae-97623518517c?action=share&creator=18754010&active-environment=18754010-aa866eb4-8070-4788-a35f-9e6945d54ce3)  

### Screenshots  
![auth](https://github.com/user-attachments/assets/b808c577-f563-402d-b2a7-b02858a6155d)  
![comments](https://github.com/user-attachments/assets/598c5cb1-c586-43bb-8278-b84b9322d9fb)  
![likes](https://github.com/user-attachments/assets/bb24ee60-0416-44d9-8f34-faf026a10b7e)  
![posts](https://github.com/user-attachments/assets/4dc29db5-f41f-4edd-b7e2-119712f6f391)  
![relationships](https://github.com/user-attachments/assets/4ceb445d-1419-4964-b868-06f19b4ca5df)  
![stories](https://github.com/user-attachments/assets/814a9c62-c56a-41d8-b802-952acffd742a)  
![users](https://github.com/user-attachments/assets/d25eea1e-08ea-4f45-991a-d7b813212f55)  



## 🔑 Key Features

✔ **CRUD Operations** for users, posts, stories, and interactions  
✔ **JWT Authentication** – secure login & session handling  
✔ **Password Hashing** with `bcryptjs`  
✔ **Server-Side Validation** using `express-validator`  
✔ **Pagination** for large datasets  
✔ **Swagger API Documentation** for collaboration & developer experience 


## ⚙️ Installation

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

## License
This project is licensed under the MIT License.




