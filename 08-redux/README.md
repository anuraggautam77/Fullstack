# Assignment - Week 9

Submission date : 7th Dec

## Part 1
The objective is to revise writing Reducers.

For the TodoList Application:

1. Create a new todo app using the command `create-react-app todo --typescript`
1. Write a TodoApp reducer, which supports the following operations within a board:
  1. Add Item
  1. Edit Item
  1. Delete Item
  1. Move Item
  1. Mark Item as Complete
  1. Mark Item as Incomplete
1. Write at-least 1 positive test case for each action
1. Reducer must be a pure function

## Part 2
The objective is to demonstrate redux implementation skills.

For the Trello Application:

1. Create a new trello app using the command `create-react-app trello --typescript`
1. Write a TrelloApp reducer, which support the following operations within a board:
  1. Create, Edit and Move List and Card, and edit Board Name (State: `{currentBoard: {...}}`)
  1. Edit Board Name (State: `{boardsList: []}`)
1. Write at-least 1 positive and 1 negative test case for each action
1. Reducer must be a pure function

## Part 3

For the Slack Application:

1. Create a new slack app using the command `create-react-app slack --typescript`
1. Write a SlackApp reducer, which support the following operations within a board:
  1. Create Channel, Send Message, Change CurrentChannel, Edit Message, Delete Message (State: `{channelsList: [], curentChannel: []}`);
1. Write at-least 1 positive and 1 negative test case for each action

# Setup
1. Start by forking and cloning this repository into your account.

# Submission
1. After completing the exercise/assignment, create a git tag by typing the command `git tag submission`
2. Push your tag to the server by typing the command `git push origin submission`

# Post Submission
- A mentor will review your submission, and will open an issue with review comments.
- You must resolve all the review comments, and re-submit the assignment, by following the steps in Submission

# Completion
- Submission does not mean that the assignment is complete
- Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor
