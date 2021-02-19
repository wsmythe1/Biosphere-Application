# Biosphere-Application
This is an Ionic 6 Angular 10 progressive web applcation with the purpose of providing an easy-to-use interface that allows user's to effieciently interact with Madingley Model data sets.
For more information on how the Angular components interact with eachother and how the Ionic framework works please visit: [Angular](https://angular.io/) [Ionic-Angular](https://ionicframework.com/docs/angular/overview) [Ionic](https://ionicframework.com/)
<br>
## About the application
This application currently has 8 different screens. The code for each screen is stored in the 'pages' folder and seperated into sub folder's by page. This application is an Ionic UI that will use the input-scenario.service.ts (not yet implemented) and REST(ful) API practices to send HTTP requests to an AWS Lambda function via the AWS API Gateway. This Lambda funciton will process the user-input and fire back a response to be further processed and displayed as a heatmap and graph by the visualize-results page (also not implmented yet). 
<br>
## About the Madingley Model
The Madingley Model is a biodivsersity model of the earth that takes in a plethora of different input and is able to generate/provide accurate data which is essentially used to measure the overall well-being of an ecosystem. For more information on how the Madingley Model works and to view the model itslef please visit: https://madingley.github.io/
<br>
## Getting Started
1. Pre-requisites
    * If you don't already have NPM, you will need to locally run the application. NPM can be downloaded at the following link: [Get NPM!](https://www.npmjs.com/get-npm)
<br>
2. Clone the repository
    * If unsure where to start, you can begin by cloning the repository by using the terminal to navigate to the desired folder/destination and entering the command: 
    ```
    $ git://github.com/Applicasa/Sample-App---Android.git
    ```
3. Install Node Modules
    * cd into the previously cloned directory and run the command:
    ```npm i```
    * this will download all node modules necessary for running the application locally. 
4. Start the app
    * in the same folder from the previous step, run the command:
    ```
    ionic serve
    ```
    * this will host the web application version of this app at the address: http://localhost:8100/
    * for iOS and Andriod applcation previews run the command:
    ```
    ionic lab
    ```
