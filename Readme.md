# Clean Architecture Express.js TypeScript Boilerplate

A boilerplate project for building scalable and maintainable Express.js applications using Clean Architecture, TypeScript, Knex.js, and Zod for validation.

## Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [Getting Started](#getting-started)
* [Validation](#validation)
* [Database](#database)
* [Contributing](#contributing)
* [License](#license)

## Introduction

This boilerplate project aims to provide a solid foundation for building robust and maintainable Express.js applications using Clean Architecture principles. It includes a set of pre-configured tools and libraries to help you get started quickly.

## Features

* Clean Architecture structure for separation of concerns
* TypeScript for type safety and better code maintainability
* Knex.js for database interactions
* Zod for input validation
* Express.js as the web framework
* Pre-configured logging and error handling

## Getting Started

1. Clone the repository: `git clone https://github.com/Bagus-BW/Boilerplate-Express.js.git`
2. Install dependencies: `npm install` or `yarn install` or `pnpm install`
3. Create a new database and update the `knexfile.js` configuration
4. Run the migrations: `npm db:migrate` or `yarn db:migrate` or `pnpm db:migrate`
4. Run the Seeders: `npm db:seed` or `yarn db:seed` or `pnpm db:seed`
5. Start the server: `npm run dev` or `yarn run dev` or `pnpm run dev`

## Validation

Input validation is handled using Zod. Validation rules are defined in the `schemas` folder.

## Database

The project uses Knex.js for database interactions. The database configuration is defined in the `knexfile.js` file.

## Contributing

Contributions are welcome! Please submit a pull request with a detailed description of the changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.