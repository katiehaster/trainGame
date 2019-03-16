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
    var outputNextArrival = moment($("#time").val().trim(), "HH:mm").format("X");
   

    // Creates local "temporary" object for holding user input
        var newTrain = {
        name: inputName,
        firstTrainTime: inputfirstTrainTime,
        destination: inputDestination,
        frequency: inputFrequency,
        nextArrival: outputNextArrival,
        // minutesAway: outputMinutesAway,
    }

    // Uploads employee data to the database
        database.ref().push(newTrain);
    
  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");

//Retrieves added trains info from Firebase
database.ref().on("child_added", function (childSnapshot) {
    var inputName = childSnapshot.val().name;
    var inputDestination = childSnapshot.val().destination;
    var inputFrequency = childSnapshot.val().frequency;
    var outputNextArrival = childSnapshot.val().nextArrival;
    
   
});

    // $("#trainName-table").append(childStorage.name+"<br>");
    // $("#destination-table").append(childStorage.destination+"<br>");
    // $("#frequency-table").append(childStorage.frequency+"<br>");
    // $("#nextArrival-table").append(childStorage.nextArrival+"<br>");
    // $("#minutesAway-table").append(childStorage.minutesAway+"<br>");

    var frequency = inputFrequency;
    var firstTime = inputfirstTrainTime;
    var nextTrain = outputNextTrain;
    var tMinutesTillTrain = outputMinutesAway,

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment().format("hh:mm");
    console.log(currentTime);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

     // Time apart (remainder)
     var tRemainder = diffTime % frequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      //changing the html
    var newRow = $("<tr>").append(
        $("<td>").text(inputName),
        $("<td>").text(inputDestination),
        $("<td>").text(inputFrequency),
        $("<td>").text(outputNextArrival),
        $("<td>").text(tMinutesTillTrain)
      );

       // Append the new row to the table
  $("#train-table > tbody").append(newRow);
}, 

   
// function (errorObject) {
//     console.log("Thing that went sideways: " + errorObject.code);
// })