# Inventory Tracking Application
Shopify Fall 2022 Back-End Challenge. Guidelines for the assessment can be found [here](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit).

All features for the challenge mentioned in the rubric above have been implemented, which includes basic CRUD functionality of creating inventory items, viewing them, editing them, and deleting them.

## Additional Feature
The first option for the additional features was implemented, which is to allow flexibility in the deletion of items. This includes allowing deletion comments, and the option for users to undo deletion.

## Demo
A demo can be found on Replit by clicking the link [here](https://replit.com/@JohnChung4/Inventory-Tracking-Application#.replit).

## Installation, Local Setup, and Running Tests
1. Download [Node](https://nodejs.org/en/download/)
2. ```npm install```
3. ```npm start```
4. ```npm test``` to run tests locally

### Languages, Technologies, and Design Patterns
- Back-end: Node.js, Express.js, REST
- Database & Libraries: MongoDB, Mongoose
- Front-end: Javascript, HTML (EJS), CSS
- Unit Testing: Jest.js
- Design Patterns: MVC

## API Documentation and Design

### GET /inventoryCollection
Used to retrieve home page of application.

### POST /inventoryCollection/create
Used to create a new inventory item.

### POST /inventoryCollection/edit/:id
Used to enter edit state of an inventory item. Requires ```id``` in the params.

### POST /inventoryCollection/submitUpdate/:id
Used to submit the changes of the inventory item in edit state. Requires ```id``` in the params.

### POST /inventoryCollection/cancel/:id
Used to cancel being in the edit state. Requires ```id``` in the params.

### POST /inventoryCollection/deleteUpdate/:id
Used to delete an item from the view. Note: DELETE request was not used to account for soft deletion. 
Requires ```id``` in the params.

### PATCH /inventoryCollection/undo/:id
Used to undo the deletion of an item. Requires ```id``` in the params.

### PATCH /inventoryCollection/comment/:id
Used to allow comments before deleting an item. Requires ```id``` in the params.
