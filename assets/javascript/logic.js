// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCcuXZXNmLFDO8EV2GrcK3XrorSbVOaC8I",
   authDomain: "healthy-connex.firebaseapp.com",
   databaseURL: "https://healthy-connex.firebaseio.com",
   projectId: "healthy-connex",
   storageBucket: "healthy-connex.appspot.com",
   messagingSenderId: "376273698490"
    };
   firebase.initializeApp(config);
   var database = firebase.database();
   var mapAddress = [];

$("#add-user-btn").on("click", function(event) {
event.preventDefault();

var userName = $("#full-name").val().trim();
var addressOne = $("#address").val().trim();
var city = $("#city").val().trim();
var state = $("#state").val().trim();
var zipCode = $("#postal-code").val().trim();
var country = $("#country").val().trim();
var mail = $("#email").val().trim();
var password = $("#password").val().trim();
var activity = $("#sel1").val().trim();
var gender = $("#male").val().trim();
var gender = $("#female").val().trim();
var activity = $("#sel1").val().trim();
var age = $("#sel2").val().trim();
var skill = $("#sel3").val().trim();

var newUser = {

  name: userName,
  address: addressOne,
  city: city,
  state: state,
  zip: zipCode,
  nation: country,
  email: mail,
  password: password,
  hobby: activity,
  gender: gender,
  age: age,
  level: skill

  
};

database.ref().push(newUser)

var ref = firebase.database().ref();
ref.once("value")
  .then(function(snapshot) {
   // var key = snapshot.key; // "ada"
   // var childKey = snapshot.child("name/last").key; // "last"
   console.log(snapshot)
  });

$("#full-name").val("");
$("#address").val("");
$("#city").val("");
$("#state").val("");
$("#postal-code").val("");
$("#country").val("");
$("#email").val("");
$("#password").val("");
$("#sel1").val("");
$("#male").val("");
$("#female").val("");
$("#sel1").val("");
$("#sel2").val("");
$("#sel3").val("");

//Prevent moving to new page
  return false;

});


//Create Firebase event for adding to the database and a 
//row in the htmls when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

console.log(childSnapshot.val());

var userName = childSnapshot.val().name;

var activity = childSnapshot.val().hobby;

console.log(userName);
console.log(activity);

$("#athlete-table > tbody").append("<tr><td>" + userName + "</td><td>" + activity + "</td></tr>");
});

var password = document.getElementById("password")
 , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
 if(password.value != confirm_password.value) {
   confirm_password.setCustomValidity("Passwords Don't Match");
 } else {
   confirm_password.setCustomValidity('');
 }
}


database.ref().on("child_added",function(childSnapshot,prevChildKey){

  
    var streetAdd=childSnapshot.val().address;
    var cityAdd=childSnapshot.val().city;
    var stateAdd=childSnapshot.val().state;
    var zipAdd=childSnapshot.val().zip;
    mapAddress.push(streetAdd+","+cityAdd + "," + stateAdd + "," + zipAdd);
    console.log(mapAddress);
    console.log(childSnapshot.val());

});


function myMap() {
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 10,
         center: {lat: 35.913200, lng: -79.055847}
       });

       setMarkers(map);
     }

     console.log(mapAddress);

     // Data for the markers consisting of a name, a LatLng and a zIndex for the
      // order in which these markers should display on top of each other.
      var triangleArea = [
        ['Chapel Hill', 35.913200, -79.055847, 4],
        ['Durham', 35.933172, -78.823514, 5],
        ['Raleigh', 35.787743, -78.644257, 3],
        ['Morrisville', 35.832915, -78.839616, 2],
        ['Cary', 35.7732072,  -78.7811169, 1]
      ];

      function setMarkers(map) {
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
       
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };
        for (var i = 0; i < 3; i++) {
          var triArea = triangleArea[i];
          var marker = new google.maps.Marker({
            position: {lat: triArea[1], lng: triArea[2]},
            map: map,
            icon: "pinkBall.png",
            shape: shape,
            title: triArea[0],
            zIndex: triArea[3]
          });

        }
      for (var j = 3; j < triangleArea.length; j++) {
          var triArea = triangleArea[j];
          var marker = new google.maps.Marker({
            position: {lat: triArea[1], lng: triArea[2]},
            map: map,
            icon: "blueBall.png",
            shape: shape,
            title: triArea[0],
            zIndex: triArea[3]
          });
          
        }
  }
        function codeAddress() {

//for (var i=0;i<newUser;i++){
    //    console.log(newUser);
          var address = document.getElementById('address').value;
          geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
          map: map,
            position: results[0].geometry.location
        });
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
//}
