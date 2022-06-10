# Cocktail-Lab

## Description
Cocktail Lab is a great way to view, create and store cocktail recipes! It allows you to see cocktail details such as name, ingredients, amounts, image and steps to make it. We also have a choice of alcoholic and non-alcoholic coctails, so you can make them without alcohol if preferred. You can create your own and upload it to the site, and edit or delete them as needed. 
 
For best performance use a computer with a Chrome or Firefox browser to view the site. It is not yet supported for mobile phone use. 

The idea behind the project was to create an Express app and use Mongoose for models and database communication. We used HTML, CSS and JavaScript, as well as validation (sessions & cookies). This includes sign up, log in & log out functionality with encrypted passwords. Further technical improvements could be made to the website in the future.

The website was first launched in June 2022 via Heroku.

## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **cocktail create** - As a user I want to create a cocktail for others to view
- **cocktail edit** - As a user I want to be able to edit my cocktail
- **cocktail delete** - As a user I want to be able to delete my cocktail if needed


## Backlog
List of other features outside of the MVPs scope
User profile:
- upload my profile picture
- see other users profile

Cocktail profile:
- comments section where users can comment on any cocktail
- filter search, by keyword or most liked cocktail

Homepage
- searchbar

## ROUTES:
- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password (hashed)
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

## Models
User model
 
```
username: String, required
password: String, required
email: String, required, unique

```
Cocktail model
```
name: String, required
category: String, required
author :{ type: Schema.Types.ObjectId, ref: User },
like :[{type: Schema.Types.ObjectId, ref: User}],
ingredients: [{ingredient: String, amount: type: String}],
steps: String,
image: String
``` 
## Links
### Trello
[Link to your trello board](https://trello.com/b/B72lw2fS/cocktail) 
### Git
The url to your repository and to your deployed project

[Repository Link](https://github.com/WenyiLULU/Cocktail-Lab)

[Deploy Link](https://cocktail-lab-kl.herokuapp.com/)
### Slides
The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/15kEZDLmtfD92nudPfhcIxGJwlMd0Oebc1FcNIgXOVfE/edit?usp=sharing)

