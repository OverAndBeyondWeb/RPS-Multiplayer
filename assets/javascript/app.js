$(document).ready(function() {
  console.log('ready');
});

var imgURLs = ['assets/images/headshot.jpg', 'assets/images/headshot2.jpg'];

var players = [];


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
var games = db.ref().child('games');

var i = 1;

var game = games.child('game');
var players = game.child('players');
var user = players.push();


console.log(game);

db.ref('.info/connected').on('value', function(snap) {
  if(snap.val()) {
    user.onDisconnect().remove();
    user.set({
      status: 'online',
      wins: 0,
      losses: 0
    });
  } 
});



// player1.child('opponent').update({
//   opponent: {
//     name: 'hershey'
//   }
// });
var player1, player2;


$('#submit-btn').on('click', function(e) {

  e.preventDefault();
  
  

  $('#player-form').hide();

 
  game.once('value').then(function(snap) {
    console.log(snap.val());
    if (!snap.val().player1) {
      player1 = game.child('player1');
      player1.set({
        name:$('#name').val()
      });
      user.update({
        name: $('#name').val(),
        player: 'player1'
      });
      console.log(user.key);
    } else {
      player2 = game.child('player2');
      player2.set({
        name:$('#name').val()
      });
      user.update({
        name: $('#name').val(),
        player: 'player2'
      });
      console.log(user.key());  
    }
  });
});

$('#select-choice-btn').click(function(e) {
  e.preventDefault();
  console.log($('input[name=weapon]:checked').val());
  user.update({
    choice: $('input[name=weapon]:checked').val()
  });
  user.once('value').then(function(snap) {
    if (snap.val().player === 'player1') {
      player1.update({
        choice: $('input[name=weapon]:checked').val()
      });
    } else {
      player2.update({
        choice: $('input[name=weapon]:checked').val()
      });
    }
  });
});


// user.on('value', function(snap) {
//   var data = snap.val();

//   $('.user-name').text(data.name);
//   $('.wins').text(data.wins);
//   $('.losses').text(data.losses);
//   $('.status').text(data.status);
// });

// game.orderByValue().limitToFirst(1).on('value', function(snap) {
//   console.log(snap.val());
//   var data = snap.val();

//   $('.user-name').text(data.name);
//   $('.wins').text(data.wins);
//   $('.losses').text(data.losses);
//   $('.status').text(data.status);
// });

// game.orderByValue().limitToLast(1).on('value', function(snap) {
//   console.log(snap.val());
//   var data = snap.val();

//   $('.user-name').text(data.name);
//   $('.wins').text(data.wins);
//   $('.losses').text(data.losses);
//   $('.status').text(data.status);

// });

// user.parent.on('value', function(snap) {
//   console.log(snap.val());
//   if (!snap.val().player1) {
    
//   }
// });


