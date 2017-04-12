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
   var mapAddress= [];
   var mapGender =[];
   var coords=[];
   var latLongCoord=[];
   var maleMap=[];
   var maleLLmap=[];
   var femMap=[];
   var femLLmap=[];


var userName = $("")
var addressOne = ("");
var city = $("");
var state = $("");
var zipCode = $("");
var country = $("");
var mail = $("");
var password = $("");
var confirmPassword = $("");
var gender = $("");
var activity = $(""); //might have changed this around make sure its accurate
var age = $("");
var skill = $("");


$("#add-user-btn").on("click", function(event) {
event.preventDefault();
userName = $("#full-name").val().trim();
addressOne = $("#address").val().trim();
city = $("#city").val().trim();
state = $("#state").val().trim();
zipCode = $("#postal-code").val().trim();
country = $("#country").val().trim();
mail = $("#email").val().trim();
password = $("#password").val().trim();
confirmPassword = $("#confirm-password").val().trim();
gender = $("#gender").val().trim();
activity = $("#sel1").val().trim();
age = $("#sel2").val().trim();
skill = $("#sel3").val().trim();

var newUser = {
  name: userName,
  address: addressOne,
  city: city,
  state: state,
  zip: zipCode,
  coordinates:coordinates,
  nation: country,
  email: mail,
  password: password,
  hobby: activity,
  gender: gender,
  age: age,
  level: skill
  
};

database.ref().push(newUser)
var mapAddress=$("address")+$("city")+$("state")+$("zip");
console.log(mapAddress);
console.log(name);
console.log(newUser.name);
$("#full-name").val("");
$("#address").val("");
$("#city").val("");
$("#state").val("");
$("#postal-code").val("");
$("#country").val("");
$("#email").val("");
$("#password").val("");
$("#confirm-password").val("");
$("#gender").val(""); //changed these around maybe
$("#sel1").val("");
$("#sel2").val("");
$("#sel3").val("");
//Prevent moving to new page
  return false;
});
$("#search-user-btn").on("click", function(event) {

event.preventDefault();

gender = $("#gender").val();
 activity = $("#interest").val(); //might have changed this around make sure its accurate
 age = $("#age").val();
skill = $("#skill").val();

var searchUser = {
  gender: gender,
  hobby: activity,
  age: age,
  level: skill

};



$("#gender").val(""); //changed these around maybe
$("#interest").val("");
$("#age").val("");
$("#skill").val("");

 return false;



});

// $(document).ready(function () {
//         $(".body").hide();
//         $("#search-user-btn").click(function () {
//             $(".body").show();
//         });
//       });
// hides the table's body on screen load and shows it on button

//Create Firebase event for adding to the database and a 
//row in the htmls when a user adds an entry

//Create Firebase event for adding to the database and a 
//row in the htmls when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

// console.log(childSnapshot.val());
var userName = childSnapshot.val().name;
//var addressOne = childSnapshot.val().address;
//gender
var activity = childSnapshot.val().hobby;
var mail = childSnapshot.val().email;
var gender = childSnapshot.val().gender;
var coordinates=childSnapshot.val().coordinates;
//changed this around 
// console.log(userName);
// console.log(activity);
 $("#athlete-table > tbody").append("<tr><td>" + userName + "</td><td>" + activity + "</td><td>" + mail + "</td><td>" + gender + "</td></tr>"); //changed this to add gender and mail
});


var maleAdd=[];
var allAdd=[];

database.ref().on("child_added",function(childSnapshot,prevChildKey){
  
    var streetAdd=childSnapshot.val().address;
    var cityAdd=childSnapshot.val().city;
    var stateAdd=childSnapshot.val().state;
    var zipAdd=childSnapshot.val().zip;
    var gender=childSnapshot.val().gender;
    var coordinates=childSnapshot.val().coordinates;
    mapAddress.push(streetAdd+","+cityAdd + "," + stateAdd + "," + zipAdd);
    mapGender.push(gender);
    coords.push(coordinates);
   // recAddress();
   mapDivide();
      });

//make new arrays of male addresses per database and femail addresses per database
function mapDivide(){
  maleMap=[];
  femMap=[];
  maleLLmap=[];
  femLLmap=[];
  coords=[];
  
    for(i=0;i<mapGender.length;i++){
     
      if (mapGender[i]==="male"||mapGender[i]==="Male"){
        maleMap.push(mapAddress[i]);
        maleLLmap.push(mapAddress[i])
        
       }
      else if(mapGender[i]==="female"||mapGender[i]==="Female"){
        femMap.push(mapAddress[i]);
        femLLmap.push(mapAddress[i]);

      }
     }

    //  console.log(maleMap);
    // console.log(femMap);
     //console.log(maleLLmap);
     //console.log(femLLmap);
   
}


//initialize map function
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,

          center: {lat: 35.913200, lng: -79.055847}
        });
        var geocoder = new google.maps.Geocoder();
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });

        setTimeout(function () {
          setMarkers();
        }, 500);

    console.log("Map Initiated");
      }
    

//place marker on map based on user input
function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });

            console.log("we are geocoding")
          } 
        });
      }



//put blue/pink pins on map to show where database members are located
   function setMarkers() {
    console.log('SET MARKERS');
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 35.913200, lng: -79.055847}
        });
        var geocoder = new google.maps.Geocoder();   
    
        // Adds markers to the map.
        console.log(femMap);
        setMaleMarkers();
      };

 function setMaleMarkers() {
    console.log('SET MARKERS');
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 35.913200, lng: -79.055847}
        });
        var geocoder = new google.maps.Geocoder();   
                    
      for (var i = 0; i < maleMap.length; i++) {
        
        console.log(maleMap);
           
        geocoder.geocode( { 'address': maleMap[i]}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var maleMarker = new google.maps.Marker({
            map: map,
            icon:"blueBall.png",
            position: results[0].geometry.location
            });//end marker
        console.log(maleMap);
         } //end if statement
        
        });//end geocoder.geocode
        setFemMarkers();
      }//end for loop
    }

 function setFemMarkers() {
    console.log('SET MARKERS');
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 35.913200, lng: -79.055847}
        });
        var geocoder = new google.maps.Geocoder();   
                    
        for (var j = 0; j < femMap.length; j++) {
        console.log(femMap);
           
        geocoder.geocode( { 'address': femMap[i]}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var femMarker = new google.maps.Marker({
            map: map,
            icon:"pinkBall.png",
            position: results[0].geometry.location
        });

        console.log(femMap);
        }

      }); // end geocoder
     } //end for loop
    }//end setMarkers()

