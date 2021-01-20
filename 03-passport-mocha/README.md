# Assignment - Week 2

Time: 4 hrs

# Part 1
The objective is to demonstrate implementation of Authentication and Authorization, and Routes Protection

For the Trello Application:
1. Create Login And Register Route
2. Write Passport MiddleWare to authenticate user
3. Protect all the Other Routes. All the backend-routes can only be accessible only when the user is authenticated

# Part 2
The objective is to demonstrate the ability to write Unit Tests for the applications built so far

For the Trello Application:
1. Write unit test cases for your protected(authenticated) & unprotected routes using Mocha, Chai, Supertest
1. Write Swagger documentation for your REST APIs
1. Follow a standard folder structure of your REST API code
1. Configure Gitlab-CI, such that, it runs test cases every push to master branch is deployed to heroku

# Prerequisites
1. Ensure NodeJS, NPM and Git are installed
1. Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom

# Setup
1. Start by forking this repository into your account.
2. Add your 02-express-rest-api repository as a remote with the command: `git add remote 02-express-rest-api <insert-02-express-rest-api-repository-url-here>`
3. Merge your 02-express-rest-api changes into the master branch with the command: `git merge 02-express-rest-api/master`. You will get a merge conflict in Readme.md file.
4. Update the Readme.md file to these instructions, and remove the instructions from 02-express-rest-api.
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

# DEMO URL
-https://auth-rest-pass.herokuapp.com/