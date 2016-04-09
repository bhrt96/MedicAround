$(document).ready(function() {
	initMap();
	// search();
	current_location();
});

var map, marker;
var check_marker = 0;
function initMap() {
  	map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: -34.397, lng: 150.644},
    	zoom: 13
  	});
  	google.maps.event.addListener(map, 'click', function(event) {
	   placeMarker(event.latLng);
	});

	function placeMarker(location) {
		if(check_marker==1)
			marker.setMap(null);

	    marker = new google.maps.Marker({
	        position: location, 
	        map: map
	    });
	    check_marker=1;
	    var latitude = location.lat();
	    var longitude = location.lng();
	    console.log( latitude + ', ' + longitude );

	    marker.addListener('click', function() {
			infowindow.open(map, marker);
  		});

  		var infowindow = new google.maps.InfoWindow({
    		content: contentString
  		});

  		var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';
	}
}

function current_location() {
  	// Try HTML5 geolocation.
  	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	var pos = {
	        	lat: position.coords.latitude,
	        	lng: position.coords.longitude
		    };
		    marker = new google.maps.Marker({
	        	position: pos, 
	        	map: map, 
	        	zoom: 4
	    	});
		    check_marker = 1;
	    	map.setCenter(pos);
		});
	}
}


//-------------

/*function search(){

	// Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}*/