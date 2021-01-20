# Assignment - Week 4

Due Date :- 19/11/2018

# Part 1
The objective is to demonstrate implementation of FullStack functionality, including UI Design, API desing, persistance and testing.
The UI needs to look professional.

For the Note application:
1. Extend all your previous Note assignment routes to store, retrieve update and delete notes to / from Mongo DB.
1. Configure ExpressJS to serve static HTML page from `public` folder.
2. Create a file `public/notes.html`
    1. Create the static view for displaying notes
    1. Implement the following functionality using AJAX and DOM Manipulation
    - Retrieve notes from server
    - Create a new note
    - mark a note as completed.
    - Edit a note


# Part 2
The objective is to demonstrate Design of FullStack functionality, including UI Design, API desing, persistance and testing.
The UI needs to look professional.

For the Trello Application:
1. Extend all your previous assignment routes to store, retrieve, update and delete data to / from Mongo DB.
1. Configure ExpressJS to serve static HTML pages from `public` folder.
2. Create file `public/boards.html`
    1. Create the static views for displaying list of boards, using flexbox
    1. Implement the following functionality using AJAX and DOM Manipulation
    - Retrieve list of boards from the server
    - Create a new board
    - Delete board
    - Edit board name
2. Create file `public/lists.html`
    1. Create the static views for displaying list of cards, using flexbox
    1. Implement the following functionality using AJAX and DOM Manipulation
    - Retrieve list of cards from the server
    - Create a new card
    - Delete a card
    - Edit existing card

# Part 3
The objective is to demonstrate design of FullStack functionality, including UI Design, API desing, persistance and testing.
The UI needs to look professional.

For the Slack Application:
1. Extend all your previous assignment routes to store, retrieve, update and delete data to / from Mongo DB.
1. Configure ExpressJS to server static HTML pages from `public` folder.
2. Create a file `public/channels.html`.
    1. create a static view for sending / recieving messages in a channel.
2. create a file `public/messages.html`
    1. create a static view for sending / recieving messages.

# Prerequisites
1. Ensure NodeJS, NPM and Git are installed
1. Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom

# Setup
1. Start by forking and cloning this repository into your account.
1. Add your 03-passport-mocha repository as a remote with the command: `git add remote 03-passport-mocha <insert-03-passport-mocha-repository-url-here>`
1. git remote -v should display origin and 03-passport-mocha
1. pull your 03-passport-mocha changes into the master branch with the command: `git pull 03-passport-mocha master`. Now there will be merge conflict in README.md file.
1. Update the Readme.md file to these instructions, and remove the instructions from 03-passport-mocha.
5. Commit the changes. You are now ready to start working on this programming task.

# Submission
1. After completing the exercise/assignment, create a git tag by typing the command `git tag submission`
2. Push your tag to the server by typing the command `git push origin submission`

# Post Submission
- A mentor will review your submission, and will open an issue with review comments.
- You must resolve all the review comments, and re-submit the assignment, by following the steps in Submission

# Completion
- Submission does not mean that the assignment is complete
- Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor
- 
# Demo URL
- https://anurag-kanban1.herokuapp.com/note/
- https://anurag-kanban1.herokuapp.com/trello/