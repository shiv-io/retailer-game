# Retailer Game

## How This Game Works
Please reach out to Dr. Kung to know the philosophy behind Retailer Game.

From a developer perspective, it's supported for Dr. Kung to upload the resources such as possible demands and corresponding max profit. When his students come into the site, they will be provided a random price-demand set. By selecting different price in different week, they'll get a total revenue in the end with the decision quality.

## Project Overview
It's a monolithic web application, which means both frontend & backend services are bound to one single project. 

Frontend implementation can be found under `/frontend/src`, built by React

Few notable files are as follows:
1. `frontend/src/App.js`, it's entry point, you can see routing definition and fundamental resources setup there
2. `frontend/src/components/RetailerGame/index.js`, main logic goes here, eg. buttons interaction, chart painting, revenue calculation...
3. `frontend/src/components/Upload/index.js`, page to upload resources

Backend implementation can be found under `/src`, built by NodeJs

Few notable files are as follows:
1. `src/api/index.js`, there are 2 APIs, one to return resources, the other to upload

## Must Know
It is a must-have to understand how React & React hook are going to work, and also the items listed below
* even handler (onClick callback)
* ajax request
* basic CSS knowledge

## Develop In Local
1. Make sure you have installed NodeJs & NPM(usually shipped together with NodeJs)
1. cd /your/project/location
2. execute `npm i`
3. execute `npm run page` -> starts frontend server
4. execute `npm run dev` --> starts backend server
5. open browser and navigate to http://localhost:3000/

## Side Notes
You may find some files are not used anywhere, please ignore them, it's a project originated from another that was created before, so some redundant files might not be deleted correctly.

## Deployment Steps
1. clone project to your machine
1. cd to that folder
1. npm i
1. npm run build
1. npm start
