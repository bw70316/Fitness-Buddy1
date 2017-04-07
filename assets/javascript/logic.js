//connectd to index.html



 var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword
function myMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 35.913200, lng: -79.055847}
        });

        setMarkers(map);
      }

   var config = {
   apiKey: "AIzaSyCcuXZXNmLFDO8EV2GrcK3XrorSbVOaC8I",
   authDomain: "healthy-connex.firebaseapp.com",
   databaseURL: "https://healthy-connex.firebaseio.com",
   projectId: "healthy-connex",
   storageBucket: "healthy-connex.appspot.com",
   messagingSenderId: "376273698490"
    };
   firebase.initializeApp(config);


      // Data for the markers consisting of a name, a LatLng and a zIndex for the
      // order in which these markers should display on top of each other.
      var triangleArea = [
        ['Chapel Hill', 35.913200, -79.055847, 4],
        ['Durham', 35.994034, -78.898621, 5],
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
        for (var i = 3; i < triangleArea.length; i++) {
          var triArea = triangleArea[i];
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
