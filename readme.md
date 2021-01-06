<h1 align="center">Ankasa Ticketing</h1>

[![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/defri-ansyah/Ankasa-API)
![GitHub contributors](https://img.shields.io/github/contributors/defri-ansyah/Ankasa-API)
![GitHub stars](https://img.shields.io/github/stars/defri-ansyah/Ankasa-API)
![GitHub forks](https://img.shields.io/github/forks/defri-ansyah/Ankasa-API)

<p align="center">
  <a href="https://nodejs.org/" target="blank">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
* [Prerequiste](#Prerequiste)
* [Installation](#Installation)
* [Create Environment Variable](#create-environment-variable)
* [Start Development Server](#Start-Development-Server)
* [Postman Collection](#Postman-Collection)
* [API Endpoint](#API-Endpoint)
* [About Project](#About-Project)
* [Related Project](#Related-Project)
* [Contributing](#Contributing)
* [Contact](#Contact)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/)
- Redis - Download and Install [Redis](https://redis.io/)


## Installation
### Clone
```
$ git clone https://github.com/defri-ansyah/Ankasa-API.git
$ cd Ankasa-API
$ npm install
```

## Create Environment Variable

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_TABLE_NAME
PORT=YOUR_PORT
SECRET_KEY = YOUR_SECRET_KEY
URL_EMAIL_CONFIRM = YOUR_EMAIL_VALIDATION_PAGE_FRONTEND
EMAIL = YOUR_EMAIL_CONFIRMATION
PASSWORD = YOUR_EMAIL_PASSWORD
```

### Start Development Server
```
$ npm run serve
```
## Link Collection Postman
[Click Here](https://www.getpostman.com/collections/b14d5faf192b7b980d32)

## API Endpoint
### Auth Endpoint
| No  | HTTP Method | URI                                           | Operation                                  |
| --- | ----------- | --------------------------------------------- | ------------------------------------------ |
| 1   | POST        | /api/auth/signup                              | Register new user                          |
| 2   | POST        | /api/auth/login                               | login user                                 |
| 3   | POST        | /api/auth/forgot-password/request             | Request forgot password via email          |
| 4   | POST        | /api/auth/forgot-password/new-password/:token | Forgot password                            |
| 9   | PATCH       | /api/auth/edit-password                       | Edit password from profile user            |

### User Endpoint
| No  | HTTP Method | URI                              | Operation                                  |
| --- | ----------- | -------------------------------- | ------------------------------------------ |
| 1   | PATCH       | /api/user/edit-profile           | Edit profile user                          |
| 2   | PATCH       | /api/user/update-image           | update image user                          |
| 3   | DELETE      | /api/user/delete-image           | Delete image user                          |
| 4   | GET         | /api/user/detail                 | Get detail user                            |

## About Project
Ankasa is a project inspired by one of Unicorn in Indonesia.
It's API made for Ankasa using Node Js and Express Js

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
* [`Frontend Ankasa`](https://github.com/)

---
Copyright © 2020 [Defri Ansyah](https://github.com/defri-ansyah)