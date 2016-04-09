$(document).ready(function() {
    init();
    $('select').change(function(){
        specialization = $(this).val();
        init();
    });
});

function init() {
    initMap();
    current_location();
    $('table tbody').empty();
}

var map, marker, markers = [], d;
var source, count=0, dist;
var specialization="all";

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12
        // center: {lat: -34.397, lng: 150.644},
    });
}

function placeMarker(data) {
    markers.push(marker);
    if(data.lat) {
        var dest = {
            lat : data.lat,
            lng : data.lng,
        }
    } else {
        var dest = data.location;
    }
    marker = new google.maps.Marker({
        position: dest, 
        map: map,
        title: data.name
        // animation:google.maps.Animation.BOUNCE,
    });
    // console.log("L");
    map.setCenter(source);
}

function current_location() {
    // Try HTML5 geolocation.
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            source = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            placeMarker(source);
            mark_doctors();
        }, function(error) {
            if(error)
                console.log("Fail");
        });
    }
}

function distance(source, destination) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            dist = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
        } else {
            console.log("Unable to find the distance via road.");
        }
    });
}

function mark_doctors() {
    for(i=0;i<count;i++) {
        markers.pop().setMap(null);
    }
    markers = [];
    placeMarker(source);
    count = 0;
    $.ajax({
        url:"scripts/doctorinfo.php",
        type:"POST",
        data:{'lat': source.lat, 'lng': source.lng},
        dataType:"text",
        success: function(response) {
            if(response) {
                obj = $.parseJSON(response);
                for(i=0;i<obj.length;i++) {
                    d = {
                        'location': {
                            'lat': parseInt(obj[i].latitude),
                            'lng': parseInt(obj[i].longitude),
                        },
                        'name': obj[i].name,
                        'username': obj[i].username,
                        'specialization': obj[i].specialization,
                        'hospital': obj[i].hospital,
                        'rating': obj[i].rating,
                    };
                    if(specialization=="all") {
                        placeMarker(d.location);
                        update_info(obj[i]);
                        add_table_row(d);    
                        count++;
                    }
                    else if(obj[i].specialization==specialization) {
                        placeMarker(d.location);
                        update_info(obj[i]);
                        add_table_row(d);
                        count++;
                    }
                }
            }
        } 
    });
}

function update_info(data) {
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', (function(marker, count) {
        return function () {
            infowindow.setContent("<div data-data="+data+" class='info_win'><strong><p><big>"+data.name+"</big></p><p style='line-height: 50%'>"+data.specialization+"</p></strong></div>");
            infowindow.open(map, marker);
        }
    })(marker, count));
}

function add_table_row(data) {
    distance(source, data.location);
    if(dist==undefined)
        dist = 'No Road Routes';
    $('table tbody').append("<tr><td><a href='drprofile.html?dr-user="+data.username+"'>"+data.name+"</a></td><td>"+data.specialization+"</td><td>"+data.hospital+"</td><td>"+dist+"</td><td>"+data.rating+"</td></tr>")
}