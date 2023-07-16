# Nest + Postgres + TypeScript example integration

1. Install dependencies via `yarn`
2. Run `docker-compose up -d` to start postgres
3. Run via `yarn start` or `yarn start:dev` (watch mode)
4. Example API is running on localhost:5050

# Available routes:

| method | endpoint | description              | params |
| :----- | :------- | :----------------------- | :----- |
| GET    | /todo    | finds all todos          |        |
| POST   | /todo    | creates new todo         |        |
| PUT    | /todo    | update todo by id        |        |
| PATCH  | /todo    | change status todo by id |        |
| DELETE | /todo    | delete todo by id        |        |

# Project Structure

```sh
    src
    |_ application
        |_ controllers
        |_ dtos
    |_ domain
        |_ entities
        |_ services
    |_ infrastructure
        |_ repositories

```

### - Application

This layer should limit your responsibilities to the following tasks:

1. Execute access control policies (authentication, authorization, etc.)
2. Validating user input
3. Send calls or commands to the appropriate service method
4. Transform entities returned by the service into data transfer objects (DTO) for output / serialization

###### Controllers

It receives the requests made to the server and uses the **_services_** to send responses to the client.

###### DTOs

As its name indicates, it is an object that will be used to **_transfer information_** and represents the object that will be sent to the client, this is the object that our API will return to the rest of the services, either For internal use or for third parties, so we can have multiple DTOs for each entity according to the use we need.
It is also used to define the type of objects to be received by the controllers

- The DTO should have only data, **_should not to have any type of business logic_**.
- May have references to other DTOs

### - Domain

Contains all domain level concerns, this includes **_business logic_**, and domain objects (Entities)

> Transformation to DTOs should be done exclusively at the edge (our controllers), because that is where serialization happens and also because, depending on our project requirements, several controllers or services can call these methods and they will want to deal with the purest form of the data.

###### Entities

Represents an object in the database and encapsulates key rules related to that object, so it can contain some logic to **_validate its properties_** but **_not_** complex business logic.

- An entity must always represent the **_object in the database_**, so it must not have more or less properties than the object it represents.

###### Services

It contains the business logic which provides controllers (or other services) to be used.

- Your methods can receive both **_Entities_** and **_Data_**
- They should always return **_entities_** that will be converted into **_DTOs_** by the controller

### - Infraestructure

###### Repositories

> According to Martin Fowler, the Repository Pattern can be described as:
> Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.
> So a repository will generally have methods such as findOne, findAll, remove, and such. Your service layer will manipulate the collection through these repository methods. Their implementation is not a concern to our business logic.

The repository is an intermediary between the domain and the data source and **_provides the services with the basic extraction operations (CRUD)_** (findOne, findAll, updateOne, remove).

When using TypeOrm, the CRUD methods are injected by the ORM to our repository, being able to define more specific methods (that do not imply business logic) in the repository file.
