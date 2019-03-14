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
    var tempName = $("#name").val().trim();
    var tempDestination = $("#destination").val().trim();
    var tempfirstTrainTime = $("#firstTrainTime").val().trim();
    // var convertedDate = moment(), tempFirstTrainTime;
    var tempFrequency = $("#frequency").val().trim();



    //make the server hold all that
    database.ref().push({
        name: tempName,
        firstTrainTime: tempfirstTrainTime,
        destination: tempDestination,
        frequency: tempFrequency,

    })

})

//runs on pageload + populates the table
database.ref().on("child_added", function (snapshot) {
    var childStorage = snapshot.val();
  

    //changing the html
    $("#trainName-table").append(childStorage.name+"<br>");
    $("#destination-table").append(childStorage.destination+"<br>");
    $("#frequency-table").append(childStorage.frequency+"<br>");
    // $("#nextArrival-table").append(childStorage.frequency+"<br>");
    // $("#minutesAway-table").append(childStorage.rate+"<br>");


}, 



function (errorObject) {
    console.log("Thing that went sideways: " + errorObject.code);
})