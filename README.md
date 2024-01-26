## Project name and goal
### App-drive
The aim of the project is to create a photo management application in the form of a web application utilizing modern technologies. The service user will have the ability to create a personal account within the system, manage uploaded photos, and browse them based on specific categories.

## Technologies
- Frontend: React, TypeScript, Material UI, CSS
- Backend: C#, .Net, EntityFramework
- Database: SQL Server Express, SQL Server Management Studio
- Docker

## Installation and Setup Instructions
### Docker

Download Docker Desktop or Docker Engine

In the terminal, from the directory containing the docker-compose.yml file, type `docker-compose up`.

Open [http://localhost:3000](http://localhost:3000) to view client app it in your browser.
Server application will be running at [http://localhost:4000](http://localhost:4000).
Database will be running at port [http://localhost:1433](http://localhost:1433).

![docker1](https://github.com/adamwar-dev/app-drive/assets/78816725/751f63ce-4383-422a-8d30-b5401b7885db)


### Frontend

To install, you will need Node.js and npm globally installed on your machine.\
After cloning the repository, navigate to the frontend directory and type `npm install` in the terminal to proceed with the installation.

To start the server, use `npm start`.

To visit the application, navigate to [http://localhost:3000](http://localhost:3000).

![frontend](https://github.com/adamwar-dev/app-drive/assets/78816725/a0076676-ddb3-4681-8e9a-7ef6ae6dab10)

### Backend

To run the server application, you need to have ISS (Internet Information Services) and the .NET 6 framework installed on your machine.\
We recommend installing Visual Studio and running the project directly from it.

To visit the swagger, navigate to [http://localhost:4000/swagger/index.html](http://localhost:4000/swagger/index.html).

![swagger](https://github.com/adamwar-dev/app-drive/assets/78816725/f28a5328-1e19-41d2-937d-70e5b9c5dbcf)

### Database

To run SQL Express use command line or (recommend) SSMS.

You can set up a trusted connection locally in the configuration of the server application, however, in Docker, it is necessary to create a user with appropriate permissions.

![sql](https://github.com/adamwar-dev/app-drive/assets/78816725/e9328ae9-7d18-483c-a0b4-ecae2b0b7a46)

## Authors

- Piotr Czuczeło
- Adam Warzecha
- Wojciech Wieczorek

