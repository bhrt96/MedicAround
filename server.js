var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// var api = require('./app/routes/api')(app, express, io);
// app.use('/api', api);

// app.use('/services', express.static(__dirname + '/public/app/services/'));
// app.use('/controllers', express.static(__dirname + '/public/app/controllers/'));
app.use('/js',  express.static(__dirname + '/js'));
// app.use('/css', express.static(__dirname + '/public/app/views/css/'));
// app.use('/images', express.static(__dirname + '/public/app/views/images/'));
// app.use('/uploads', express.static(__dirname + '/public/app/views/uploads/'));
// app.use(express.static(__dirname + '/public'));

app.get('/dr', function(req, res){
	res.sendFile(__dirname + '/dr.html');
});

app.get('/client', function(req, res){
	res.sendFile(__dirname + '/client.html');
});

app.get('/map', function(req, res){
	res.sendFile(__dirname + '/dynamic_map.html');
});

app.get('/validation', function(req, res){
	res.sendFile(__dirname + '/username_validation.html');
});

http.listen(3000, function(err){
	if(err)
		console.log(err);
	else
		console.log("Connected to port 3000.");
});

io.on('connection', function(socket){
	var all = io.sockets.clients();
	var patient_socketid = socket.id;
	// var online_clients = io.nsps['/'].adapter.rooms['online'];
	// var waiting_clients = io.nsps['/'].adapter.rooms['waiting'];

	// socket.on('login', function(user){
	// 	console.log("%s logged in", user.username);
	// 	socket.join('online');
	// 	var online_clients = io.nsps['/'].adapter.rooms['online'];
	// 	socket.user = user;
	// 	socket.user.socketid = user_socketid;
	// })

	// socket.on('waiting', function(){
	// 	socket.join('waiting');
	// 	var waiting_clients = io.nsps['/'].adapter.rooms['waiting'];
	// 	if(waiting_clients.length>1) {
	// 		stranger_socketid = Object.keys(waiting_clients.sockets)[0];
	// 		stranger_socket = io.sockets.sockets[stranger_socketid];
	// 		user = socket.user;
	// 		stranger = stranger_socket.user;
	// 		socket.emit('chat_connect', {user: user, stranger: stranger});
	// 		socket.broadcast.to(stranger.socketid).emit('chat_connect', {user: stranger, stranger: user});
	// 	}
	// })

	// socket.on('user_connect', function(data){
	// 	socket.stranger = data.stranger;
	// 	socket.leave('waiting');
	// 	socket.emit('chat', socket.stranger);
	// })

	// socket.on('send_message', function(data){
	// 	if(socket.stranger==undefined)
	// 		return;
	// 	console.log("%s : %s", data.sender.username , data.message);
	// 	if(data.file) {
	// 		file_name = data.file_details.name;
	// 		newPath = "public/app/views/uploads/" + file_name;
	// 	  	fs.writeFile(newPath, data.file, function (err) {
	// 	  		if(err)
	// 	  			console.log(err);
	// 	  		console.log("The file was saved!");
	// 		});
	// 	}
	// 	socket.emit('my_message', data);
	// 	socket.broadcast.to(socket.stranger.socketid).emit('stranger_message', data);
	// })

	// socket.on('stranger_disconnect', function(){
	// 	if(socket.stranger) {
	// 		socket.broadcast.to(socket.stranger.socketid).emit('chat_end', socket.user);
	// 		socket.stranger = undefined;
	// 		stranger_socket.stranger = undefined;
	// 	}
	// })

	// socket.on('disconnect', function(){
	// 	if(socket.stranger) {
	// 		console.log("%s disconnected.", socket.user.username);
	// 		socket.broadcast.to(socket.stranger.socketid).emit('chat_end', socket.user);			
	// 		socket.stranger = undefined;
	// 		stranger_socket.stranger = undefined;
	// 	}
	// })
		// console.log("Connected");
	// socket.emit('connect');
	socket.on('dr_connect', function(data) {
		console.log("Connected %s", data.username);
		socket.join('doctors');
		socket.username = data.username;
	});

	socket.on('patient_connect', function(data){
		console.log("Connected %s", data.username);
		socket.join('patients');
		socket.username = data.username;
		// socket.broadcast.to(socket.stranger.socketid).emit('stranger_message', data);
	});

	socket.on('approve', function(data){
		var doctors = io.nsps['/'].adapter.rooms['doctors'];
		for(i=1;i<=doctors.length;i++) {
			doctor_socketid = Object.keys(doctors.sockets)[0];
			doctor_socket = io.sockets.sockets[doctor_socketid];
			doctor_username = doctor_socket.username;
			if(doctor_username==data.dr.username) {
				socket.broadcast.to(doctor_socketid).emit('dr_online', data);
			}
		}
	})

	socket.on('dr_reply', function(data){
		var patients = io.nsps['/'].adapter.rooms['patients'];
		for(i=1;i<=patients.length;i++) {
			patient_socketid = Object.keys(patients.sockets)[0];
			patient_socket = io.sockets.sockets[patient_socketid];
			patient_username = patient_socket.username;
			socket.broadcast.to(patient_socketid).emit('dr_answer', data);
		}	
	})
});