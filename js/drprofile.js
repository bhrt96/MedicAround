var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});


var doctor, patient;
$(document).ready(function() {
    init();
    if($_GET['p-user']) {
            $.ajax({
                url:"scripts/patient_info.php",
                type:"POST",
                data: {'username': $_GET['p-user']},
                dataType:"text",
                success: function(response) {
                    if(response) {
                        obj = $.parseJSON(response);
                        patient = obj;
                        socket.emit('patient_connect', obj);
                        // console.log(doctor, patient);
                        socket.emit('approve', {p: patient, dr: doctor});
                    }
                }        
            });
        }
    // $('#appointment_button').click(function() {
    //     if($_GET['p-user']) {
    //         $.ajax({
    //             url:"scripts/patient_info.php",
    //             type:"POST",
    //             data: {'username': $_GET['p-user']},
    //             dataType:"text",
    //             success: function(response) {
    //                 if(response) {
    //                     obj = $.parseJSON(response);
    //                     patient = obj;
    //                     socket.emit('patient_connect', obj);
    //                     // console.log(doctor, patient);
    //                     socket.emit('approve', {p: patient, dr: doctor});
    //                 }
    //             }        
    //         });
    //     }    
    // })
    
    var socket = io.connect('http://localhost:3000');
    if($_GET['dr-username']) {
        $.ajax({
            url:"scripts/dr_info.php",
            type:"POST",
            data: {'username': $_GET["dr-username"]},
            dataType:"text",
            success: function(response) {
                Cookies.set('dr', $_GET["dr-username"]);
                obj = $.parseJSON(response);
                $('.dr_profile_info').prepend("<p id='name'><strong>Name : </strong>" + obj.name + 
                                              "</p><p id='qualification'><strong>Qualification : </strong>" + obj.qualification + 
                                              "</p><p id='specialization'><strong>Specialization : <strong>" + obj.specialization + 
                                              "</p><p id='experience'><strong>Experience : </strong>" + obj.experience + 
                                              "</p><p id='rating'><strong>Rating : <strong>" + obj.rating + 
                                              "</p><p id='phone'><strong>Phone : <strong>"+obj.phone+"</p>");

                initMap(obj);
                doctor = obj;
                socket.emit('dr_connect', obj);
            }
        });
        // $.ajax({
        //     url:"scripts/dr_app_info.php",
        //     type:"POST",
        //     data: {'username': $_GET["dr-username"]},
        //     dataType:"text",
        //     success: function(response) {
        //         Cookies.set('dr', $_GET["dr-username"]);
        //         obj = $.parseJSON(response);
        //         row = $("<tr><td>"+obj.name+"</td><td><label for = 'appointment-date'></label><input type = 'date' id = 'appointment-date'></td><td><label for = 'time-slot'></label><input type = 'time' id = 'time-slot'></td><td><button type = 'submit' name = 'decision' id='reply_yes' class='btn-floating btn-small waves-effect waves-light green'><i class='material-icons tiny'>done</i></button><button type = 'submit' id='reply_no' name = 'decision' class='btn-floating btn-small waves-effect waves-light red'><i class='material-icons tiny'>not_interested</i></button></td><td>Patient yet to reply</td></tr>");
        //         $('#appointments table tbody').prepend(row);
        //         initMap(obj);
        //         doctor = obj;
        //         socket.emit('dr_connect', obj);
        //     }
        // })
    }

    $(document).on('click', '#reply_yes', function(){
        patient = $(this).closest('tr').data('p');
        $(this).siblings('#reply_no').css({'display': 'none'});
        date = $(this).siblings('#appointment-date').val();
        time = $(this).siblings('#time-slot').val();
        socket.emit('dr_reply', {date: date, time: time, reply: 'Yes', dr:doctor, p: patient});
    })

    $(document).on('click', '#reply_no', function(){
        patient = $(this).closest('tr').data('p');
        $(this).siblings('#reply_yes').css({'display': 'none'});
        socket.emit('dr_reply', {reply: 'No', dr:doctor, p: patient});
    })

    socket.on('dr_online', function(data) {
        Materialize.toast('Appointment request from '+ data.p.name, 5000);
        row = $("<tr><form action='scripts/doctorresponse.php' method='post'><td>"+data.p.name+"</td><td><label for = 'appointment-date'></label><input type = 'date' id = 'appointment-date'></td><td><label for = 'time-slot'></label><input type = 'time' id = 'time-slot'></td><td><button type = 'submit' name = 'decision' id='reply_yes' class='btn-floating btn-small waves-effect waves-light green'><i class='material-icons tiny'>done</i></button><button type = 'submit' id='reply_no' name = 'decision' class='btn-floating btn-small waves-effect waves-light red'><i class='material-icons tiny'>not_interested</i></button></td></form></tr>");
        $('#appointments table tbody').prepend(row);
        row1 = $("<tr><td>"+data.dr.name+"</td><td>"+data.dr.hospital+"<td></td><td></td>");
        $('#previousVisits table tbody').prepend(row1);
        row.data('p', data.p);
        row1.data('dr', data.dr);
    })

    socket.on('dr_answer', function(data) {
        if(data.reply==='Yes') {
            console.log(data.dr, data.p, data.reply, data.date, data.time);
        }
        if(data.reply==='No') {
            console.log(data.dr, data.p, data.reply);
        }
    })
})

function init() {
    if($_GET['dr-user']) {
        $.ajax({
            url:"scripts/dr_info.php",
            type:"POST",
            data: {'username': $_GET["dr-user"]},
            dataType:"text",
            success: function(response) {
                Cookies.set('dr', $_GET["dr-user"]);
                // console.log(response);
                obj = $.parseJSON(response);
                $('.dr_profile_info').prepend("<p id='name'><strong>Name : </strong>" + obj.name + 
                                              "</p><p id='qualification'><strong>Qualification : </strong>" + obj.qualification + 
            								  "</p><p id='specialization'><strong>Specialization : <strong>" + obj.specialization + 
            								  "</p><p id='experience'><strong>Experience : </strong>" + obj.experience + 
            								  "</p><p id='rating'><strong>Rating : <strong>" + obj.rating + 
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