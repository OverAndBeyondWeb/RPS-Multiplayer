$(document).ready(function() {
  console.log('ready');
});

var imgURLs = ['assets/images/headshot.jpg', 'assets/images/headshot2.jpg'];


//firebase
var config = {
  apiKey: "AIzaSyACaf-YMw9ey5QOJMrL4t1YDwx78wBeTx0",
  authDomain: "clickbutton-1fab7.firebaseapp.com",
  databaseURL: "https://clickbutton-1fab7.firebaseio.com",
  projectId: "clickbutton-1fab7",
  storageBucket: "clickbutton-1fab7.appspot.com",
  messagingSenderId: "124892798375"
};
firebase.initializeApp(config);

var db = firebase.database();

var players = db.ref('players');
var user = players.push();



db.ref('.info/connected').on('value', function(snap) {
  if(snap.val()) {
    user.onDisconnect().remove();
    user.set({status: 'online', wins: 0, losses: 0});
  } 
});


$('#submit-btn').on('click', function(e) {

  e.preventDefault();
  user.update({
    name: $('#name').val(),
  }); 

  $('#player-form').hide();

  $(user-name).text();
 
  
});

user.on('value', function(snap) {
  var data = snap.val();

  $('.user-name').text(data.name);
  $('.wins').text(data.wins);
  $('.losses').text(data.losses);
  $('.status').text(data.status);
});

user.on('child_added', function(snap) {
  console.log(snap.val());
});

$('body').on('click', function() {
  console.log(db.ref(user + '/name'));
});
