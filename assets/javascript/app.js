$(document).ready(function() {
  console.log('ready');
});




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

var userObj = {
  name: '',
  status: ''
};


db.ref('.info/connected').on('value', function(snap) {
  if(snap.val()) {
    user.onDisconnect().remove();
    user.set({status: 'online'});
  } 
});


$('#submit-btn').on('click', function(e) {

  e.preventDefault();
  user.update({
    name: $('#name').val(),
    wins: 0,
    losses: 0
  }); 
  console.log(userObj.name);
});
