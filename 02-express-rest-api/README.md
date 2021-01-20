# Restful API's using Express.js

## Part 1: Note Taking Application (Reference Google Keep: <keep.google.com>)

The objective of Part 1 is to demonstrate Technical Capability using ExpressJS.

Create a Restful API for a Note taking application. You should be able to `Create`, `Read`, `Update` and `Delete` a particular note. Also, create one api to fetch all the Notes. 

1. Get all the notes. (It should also support sorting the notes by it's date of creation)
2. Get a single note by it's ID.
3. Create a new note.
4. Update a existing note.
5. Delete a existing note.

- Test your API's using Postman.
- Send back proper Http status codes and error messages on invalid requests.
- Write modular code with the help of Express router.
- Create a middleware to validate the request body.
- Error Handling should be in place.
- Setup Eslint with Airbnb and resolve all lint errors and warnings.

Make sure **Note** has atleast these 4 properties. 
 - noteId
 - noteTitle
 - noteDescription
 - createdAt

Feel free to add more properties to the Note object as per your requirements.

CD should be configured and the API's should be deployed on Heroku.

## Part 2: Build RESTful APIs for Kanban Application (Reference: Trello <trello.com>)

The objective of Part 2 is to demonstrate Design Capabilities for HTTP API Design.

Create RESTful APIs for a Kanban Application, which include the following functionality
1. Create, Retrieve, Update and Delete Boards
2. Create a list at an index in Board
3. Create a card at an index in a list in a Board

## Part 3: Build RESTful APIs for a Collaboration Application (Reference: Slack <slack.com>)

The objective of Part 2 is to demonstrate Design Capabilities for HTTP API Design.

Create RESTful APIs for a Collaboration Application, which include the following functionality
1. Create, Retrieve, Update and Delete Workspaces
2. Add users to workspace
3. Create channel in workspace
4. Add users to channels in workspace
5. List Users in a channel


# Further Reading Required
- RESTful APIs cheatsheet: https://github.com/RestCheatSheet/api-cheat-sheet
- Array Iteration Methods: every, find, findIndex, filter, sort, map, reduce, reduceRight


# Prerequisites

Ensure NodeJS, NPM and Git are installed
Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom



# Setup


Start by forking this repository into your account.



# Submission


After completing the exercise/assignment, create a git tag by typing the command git tag submission

Push your tag to the server by typing the command git push origin submission




# Post Submission


A mentor will review your submission, and will open an issue with review comments. Please allow only the mentor to close this issue.
You must resolve all the review comments, and re-submit the assignment, by creating a new tag and pushing:

- For first refactor, tag with `git tag refactor-1`, and push: `git push origin master`. Update this with refactor-2, and so on for subsequent submissions.



# Completion


Submission does not mean that the assignment is complete
Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor


# Demo URL

https://api-rest-demo77.herokuapp.com/