Setup
- Install the dependencies present in the “package.json”;
- Run the server.js on the main directory “node .\server.js” 
- Open browser on "http://localhost:8080/";

Functionalities 
- It is possible to add 10 localities without repetitions; 
- The input it is not case-sensitive; 
- It is possible to sort the table by column (string, time, decimal); 
- The main graph displays the average temperatures; 
- The city modals, shows the temperature graphs for the next 48 hours; 
- The webpage provides a responsive Bootstrap interface. 

Implementation 
- This client page works with an internal nodejs API that uses 2 external APIs; 
- One API is for geolocation (locationiq), and the other is for the weather info (darksky); 
- There are 2 main get methods (‘/forecast/daily/:city’ & ‘/forecast/hourly/:lat/:lon’); 
- The internal API stores the log entries for each operation (nedb); 
- The API keys are stored (.env file); 
- The index.html contains all the logic including the JS; 
- I tested The interface on chrome and Firefox.

