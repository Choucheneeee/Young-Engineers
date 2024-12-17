# YEngineers

This is the backend for the **YEngineers**, built with **MongoDB**  **Express.js** and **ReactJS** **Node.js**. The application helps administrators manage children, parents, groups, programs, attendance, and payments for educational activities in a structured and efficient way.

---
##  Live Demo
Access the application here: https://young-engineers-front-5lu4qv1ri-choucheneeees-projects.vercel.app/login
---
##  Default Admin User
To log in as the default administrator, use the following credentials:

    Email: admin@gmail.com
    Password: 12345

---
##  Backend Repository
The frontend for this project is available here: [YEngineers Backend Repository](https://young-engineers-front-git-chouchene-choucheneeees-projects.vercel.app/login)

## Features

### Admin Features
- Manage programs: create, update, delete, and assign groups to programs.
- Manage groups: create, update, delete, and schedule groups.
- Manage children: create, update, delete profiles and assign to parents and groups.
- Track attendance: mark and view attendance for sessions.
- Payment management: record payments and generate financial reports.
- Parent account management: create and manage parent accounts linked to children.

### Parent Features
- View linked children's profiles, attendance, and progress.
- Monitor payments and program progression.
- See earned stickers and completed models.

---

## Tech Stack
- **Frontend Framework:** ReactJS
- **Backend Framework:** Node.js/Express.js
- **Database:** MongoDB/Atlas
- **Environment Variables Management:** dotenv
- **Authentication:** bcryptjs, jsonwebtoken
- **Middleware:** body-parser, cors

---

## Installation

### Prerequisites
- Node.js installed on your system.
- MongoDB installed or a MongoDB URI (cloud/local).

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/Choucheneeee/Young-Engineers-Front.git
   cd Young-Engineers-Front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/YEngineers
   JWT_SECRET=your_secret_key
   ```

4. Start the server in development mode:
   ```bash
   npm run dev
   ```

5. To run the server in production mode:
   ```bash
   npm start
   ```

---


## API Endpoints

### Authentication
| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/api/auth/login`  | User login         |
| POST   | `/api/auth/register` | Admin/parent registration |

### Users
| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/users`      | Get all users      |
| POST   | `/api/users`      | Create a user      |
| PUT    | `/api/users/:id`  | Update a user      |
| DELETE | `/api/users/:id`  | Delete a user      |

### Children
| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/api/children`     | Get all children             |
| POST   | `/api/children`     | Create a child profile       |
| PUT    | `/api/children/:id` | Update a child profile       |
| DELETE | `/api/children/:id` | Delete a child profile       |

### Groups
| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/api/groups`    | Get all groups          |
| POST   | `/api/groups`    | Create a group          |
| PUT    | `/api/groups/:id`| Update a group          |
| DELETE | `/api/groups/:id`| Delete a group          |

### Programs
| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| GET    | `/api/programs`    | Get all programs        |
| POST   | `/api/programs`    | Create a program        |
| PUT    | `/api/programs/:id`| Update a program        |
| DELETE | `/api/programs/:id`| Delete a program        |

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---


## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---
##  Live Demo
Access the application here: https://young-engineers-front-5lu4qv1ri-choucheneeees-projects.vercel.app/login
---
##  Default Admin User
To log in as the default administrator, use the following credentials:

    Email: admin@gmail.com
    Password: 12345

---

## Contact

For questions or feedback, please contact:
- **Email**: chouchene.amine.etud@gmail.com
