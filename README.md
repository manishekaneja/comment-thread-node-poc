
# Fullstack Assignment
## Problem Statement 
***To Build a Commenting System with following features***
- User can make a Comment in this system.
 - Ablity to comment on any available post.
- Ability to Edit it's Comment, after being posted.
## Major Tasks
- To Keep a Record of a Comments
- To Keep Record of replies to any Comment
- To keep Record of User commenting on the Platform.
### Features
- Every User has ability to like or dislike any comment, and that doesn't require login ore register step.
- Anyone can like or dislike any number or times.
- Users are notified for most of the Actions.
## Solution
> To provide a solution to this problem. I have used follow majorly javascript technologies:
	
 - For Back-end
	 - Node JS
	 - Express JS
	 - Mongoose
	 - Mongo DB ( mlab's remote server sandbox )
	 - GraphQL
	 
> Basic Requirement to run this Solution on a System is Node JS, which includes npm, npx
> (Node JS is required to download the packages from store and initiate the Project)
# How to Run The Code
> Clone the Repository or Download as zip
>  ***This is only to run the Backend***  
### Perform the following instructions
	cd backend/
##### To install Dependencies
	npm install
##### Or
	yarn
#### To Run Server
	npm start
#### Or
	yarn start
*Server Will Run on Port 4000 , make sure to keep it free.*
## Explantation

> This is a single Screen Application which includes a Header and Body Section
>
> Header has only two major Functions ( To provide User with Login and Register Features )
>
> Body Consist of All the Post/Comment, which are visible to every person but only a logged in Person can make changes in the System. *Excluding the like and dislike changes.*
>
>Only a logged in user can reply to any Comment and edit a comment ( if posted by him only )
>
> Security Level of users is kept minimal for prototype purpose
### Code Overview
> Backend consist of  ***index.js***  which will run the Server
>
> It also includes ***models *** folder containing all the Schema for Database
>
> Along with that ***graphql_schema*** folder is present containing all the GraphQL Schema

##
*Remember to add the address of mongoDB server in "keys.json" as it was removed before comminting the code.*

*By default appliction will fetch from localhot:4000*