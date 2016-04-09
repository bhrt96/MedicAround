var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});

var doctor, patient;
var socket = io.connect('http://localhost:3000');

$(document).ready(function() {
    init();

    $(document).on('click', '#reply_yes', function(){
        patient = $(this).closest('tr').data('p');
        $(this).siblings('#reply_no').css({'display': 'none'});
        // socket.emit('dr_reply', {reply: 'Yes', dr:doctor, p: patient});
    })

    $(document).on('click', '#reply_no', function(){
        patient = $(this).closest('tr').data('p');
        $(this).siblings('#reply_yes').css({'display': 'none'});
        // socket.emit('dr_reply', {reply: 'No', dr:doctor, p: patient});
    })

    socket.on('dr_online', function(data) {
        Materialize.toast('Appointment request from '+ data.p.name, 5000);
        row = $("<tr><td>"+data.p.name+"</td><td><label for = 'appointment-date'></label><input type = 'date' id = 'appointment-date'></td><td><label for = 'time-slot'></label><input type = 'time' id = 'time-slot'></td><td><button type = 'submit' name = 'decision' id='reply_yes' class='btn-floating btn-small waves-effect waves-light green'><i class='material-icons tiny'>done</i></button><button type = 'submit' id='reply_no' name = 'decision' class='btn-floating btn-small waves-effect waves-light red'><i class='material-icons tiny'>not_interested</i></button></td><td>Patient yet to reply</td></tr>");
        $('#appointments table tbody').prepend(row);
        // console.log(row);
        row.data('p', data.p);
    })

    socket.on('dr_answer', function(data) {
        if(data.reply==='Yes') {
            console.log(data.dr, data.p, data.reply);
        }
        if(data.reply==='No') {
            console.log(data.dr, data.p, data.reply);
        }
    })
})

function init() {
    if($_GET['p-user']) {
    	$.ajax({
            url:"scripts/patient_info.php",
            type:"POST",
            data: {'username': $_GET["p-user"]},
            dataType:"text",
            success: function(response) {
                Cookies.set('dr', $_GET["p-user"]);
                obj = $.parseJSON(response);
            	$('.p_profile_info').prepend("<p id='name'><strong>Name : </strong>" + obj.name + 
            								  "</p><p id='qualification'><strong>Gender : </strong>" + obj.gender + 
            								  "</p><p id='email'><strong>Email : <strong>" + obj.email + 
            								  "</p><p id='phone'><strong>Phone : <strong>"+obj.phone+"</p>");

                doctor = obj;
                initMap(obj);
            }
    	})
    }
}

function initMap(response) {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(parseFloat(response.latitude), parseFloat(response.longitude)),
        zoom: 5
    });
    var marker = new google.maps.Marker({
        position:{'lat': parseFloat(response.latitude), 'lng': parseFloat(response.longitude)},
    });
    marker.setMap(map);
}