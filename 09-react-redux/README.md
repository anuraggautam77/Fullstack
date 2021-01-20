# Assignment - Week 9

Submission date : 16th Jan

## Part 1
The objective is to demonstrate implementation skills in React bindings with Redux.

For the Trello Application:

1. Copy all the components created as part of the `07-thinking-in-react` assignment into the `src/components` directory.
1. Identify the container component(s) and create one if required.
1. Use `connect()` from `react-redux` to bind Redux state to props, and dispatch to props.
1. Integrate the functionality for the `Board` view, which was completed as part of `07-thinking-in-react` assignment:
  1. Edit Board Name
  1. Add, Edit and reposition Card
  1. Add, Edit and reposition List

## Part 2
The objective is to demonstrate design and implementation skills with Redux.

For the Slack Application:
1. Copy all the components created as part of the `07-thinking-in-react` assignment into the `src/components` directory.
1. Use `connect()` from `react-redux` to bind Redux state to props, and dispatch to props.
1. Integrate the functionality for slack workspace view:
  1. Change Current Channel
  1. Select user for direct message

# Setup
1. Start by forking and cloning this repository into your account.
1. Add your `08-redux` repository as a remote with the command: `git remote add 08-redux <insert-08-redux-repository-url-here>`
1. `git remote -v` should display origin and 06-scalable-auth-with-docker
1. Pull your `08-redux` changes into the master branch with the command: `git pull 08-redux master`. Now there will be merge conflict in README.md file.
1. Update the `README.md` file to these instructions, and remove the instructions from `08-redux`.
1. Copy the React components as created in the `07-thinking-in-react` repository, and place them in the `src/components` directory for both `slack` and `trello` projects respectively.
1. Commit the changes. You are now ready to start working on this programming task.

# Submission
1. After completing the exercise/assignment, create a git tag by typing the command `git tag submission`
2. Push your tag to the server by typing the command `git push origin submission`

# Post Submission
- A mentor will review your submission, and will open an issue with review comments.
- You must resolve all the review comments, and re-submit the assignment, by following the steps in Submission

# Completion
- Submission does not mean that the assignment is complete
- Expect 1-4 review-refactor-resubmit iterations before the assignment is accepted as Complete by a mentor.
