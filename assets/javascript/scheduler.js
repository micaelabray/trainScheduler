// Sets up Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCL7gDVBatQ3Mr5I09HBBAOPFBX3jFKahc",
    authDomain: "trainscheduler-75cc9.firebaseapp.com",
    databaseURL: "https://trainscheduler-75cc9.firebaseio.com",
    projectId: "trainscheduler-75cc9",
    storageBucket: "trainscheduler-75cc9.appspot.com",
    messagingSenderId: "819820974601",
    appId: "1:819820974601:web:bc88bc66b3978257"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "LT").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);

    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainStart);
    // console.log(trainFrequency);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("H HH");
  
    // Time until next train
    var nextTrain = moment().diff(moment(nextTrain, "X"), "H HH");
    // console.log(nextTrain);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),
      // $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });

