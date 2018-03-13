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


var player1, player2, user1, user2;


$('#submit-btn').on('click', function(e) {

  e.preventDefault();
  
  

  $('#player-form').hide();


  game.once('value').then(function(snap) {
    console.log(snap.val());
    if (!snap.val().player1) {
      player1 = game.child('player1');
      user1 = players.child(user.key);
      player1.set({
        name:$('#name').val(),
        userKey: user.key
      });
      user.update({
        name: $('#name').val(),
        player: 'player1',
        userKey: user.key
      });
      
    } else {
      player2 = game.child('player2');
      user2 = players.child(user.key);
      player2.set({
        name:$('#name').val(),
        userKey: user.key
      });
      user.update({
        name: $('#name').val(),
        player: 'player2',
        userKey: user.key
      });
      
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
  game.once('value').then(function(snap) {
    if (snap.val().player1.choice && snap.val().player2.choice) {
      console.log(snap.val().player1.choice, snap.val().player2.choice)
      var winMessage = chooseWinner(snap.val().player1.choice, snap.val().player2.choice);
      game.update({winMessage: winMessage});
    }
  });
});


user.on('value', function(snap) {
  var data = snap.val();

  $('.user-name').text(data.name);
  $('.wins').text(data.wins);
  $('.losses').text(data.losses);
  $('.status').text(data.status);
});

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

function chooseWinner(p1Choice, p2Choice) {
  if (p1Choice === 'rock' && p2Choice === 'rock') {
    return 'The result is a tie!'
  }
  if (p1Choice === 'rock' && p2Choice === 'paper') {
    return 'Player 2 Wins!'
  }
  if (p1Choice === 'rock' && p2Choice === 'scissors') {
    return 'Player 1 Wins!'
  }
  if (p1Choice === 'paper' && p2Choice === 'rock') {
    return 'Player 1 Wins!'
  }
  if (p1Choice === 'paper' && p2Choice === 'paper') {
    return 'The result is a tie!'
  }
  if (p1Choice === 'paper' && p2Choice === 'scissors') {
    return 'Player 2 Wins!'
  }
  if (p1Choice === 'scissors' && p2Choice === 'rock') {
    return 'Player 2 Wins!'
  }
  if (p1Choice === 'scissors' && p2Choice === 'paper') {
    return 'Player 1 Wins!'
  }
  if (p1Choice === 'scissors' && p2Choice === 'scissors') {
    return 'The result is a tie!'
  }
}
