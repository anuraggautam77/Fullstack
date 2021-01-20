# Programming Task Week 14

Submission date : 11th Feb

## Part 1 - Login with Github
The objective is to practice implementation of OAuth2 using Github to login to a user application

1. Implement "Login with Github" functionality for your Trello application
1. You should not push Github client_id and client_secret with your code

## Part 2 - Login with * (Gitlab / Facebook / Google / Twitter)

The objective is to demonstrate implementation of OAuth2 using any other platform

1. Follow the __Setup instructions__ to obtain your assignment submission from `06-scalable-auth-with-docker`
1. Change the authentication scheme of either JWT or Session based authentication submission, by implementing Login with OAuth2 using one or more of the following OAuth2 services
  - gitlab-sapient.stackroute.in
  - Facebook
  - Google
  - Twitter
1. Ensure that you are not pushing the client_id and client_secret with your code

# Setup
1. Start by forking and cloning this repository into your account.
1. Add your `06-scalabe-auth-with-docker` repository as a remote with the command: `git remote add 06-scalabe-auth-with-docker <insert-06-scalabe-auth-with-docker-repository-url-here>`
1. `git remote -v` should display origin and 06-scalable-auth-with-docker
1. Pull your `06-scalabe-auth-with-docker` changes into the master branch with the command: `git pull 06-scalabe-auth-with-docker master`. Now there will be merge conflict in README.md file.
1. Update the `README.md` file to these instructions, and remove the instructions from `06-scalabe-auth-with-docker`.
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
