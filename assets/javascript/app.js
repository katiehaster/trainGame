 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyA25h4ZbyW8T7pb8ISU02rSPfQYs0gJ_FE",
    authDomain: "train-homework2.firebaseapp.com",
    databaseURL: "https://train-homework2.firebaseio.com",
    projectId: "train-homework2",
    storageBucket: "train-homework2.appspot.com",
    messagingSenderId: "373701703975"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-button").on("click", function (event) {
    event.preventDefault();

    //VARIABLES from INPUTS
    var inputName = $("#name").val().trim();
    var inputDestination = $("#destination").val().trim();
    var inputFrequency = $("#frequency").val().trim();
    var inputfirstTrainTime = $("#firstTrainTime").val().trim();

    // Creates local "temporary" object for holding user input
    var newTrain = {
    name: inputName,
    firstTrainTime: inputfirstTrainTime,
    destination: inputDestination,
    frequency: inputFrequency,
    }

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // logs to console
    console.log(newTrain.name);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    
  // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});

//Retrieves added trains info from Firebase
database.ref().on("child_added", function (childSnapshot) {

    // Stores info in variables
    var inputName = childSnapshot.val().name;
    var inputfirstTrainTime = childSnapshot.val().firstTrainTime;
    var inputDestination = childSnapshot.val().destination;
    var inputFrequency = childSnapshot.val().frequency;
    var outputNextArrival = childSnapshot.val().nextArrival;

    // Train Info
    console.log(inputName);
    console.log(inputfirstTrainTime);
    console.log(inputDestination);
    console.log(inputFrequency);
    console.log(outputNextArrival);

    var tfrequency = inputFrequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(inputfirstTrainTime, "HH:mm").subtract(1, "years");
    console.log(inputfirstTrainTime);
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log(currentTime);

    // Difference between the times
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

     // Time apart (remainder)
     var tRemainder = diffTime % tfrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = tfrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm a");
     console.log("ARRIVAL TIME: " + moment(nextTrain));

      //changing the html
    var newRow = $("<tr>").append(
        $("<td>").text(inputName),
        $("<td>").text(inputDestination),
        $("<td>").text(inputFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
      );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

});

   

