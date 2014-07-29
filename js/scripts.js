// PROTOTYPE //
var Tamagotcha = {
  // Initializes starting stats for Tamagotcha //
  initialize: function(initializedName) {
    this.name = initializedName;
    this.foodLevel = 100;
    this.sleepLevel = 100;
    this.moodLevel = 100;
    this.ageLevel = 1;
  },
}

// Stat depreciation over time //
var countDown = function(myPet) {
  myPet.foodLevel -= 1;
  myPet.sleepLevel -= 1;
  myPet.moodLevel -= 0.5;
  $('#level').text("LVL " +myPet.ageLevel);
  $('#foodNum').text(myPet.foodLevel);
  $('#sleepNum').text(myPet.sleepLevel);
  $('#moodNum').text(myPet.moodLevel);
// Stat bar animations //
  $('#foodBar').animate({
  height: myPet.foodLevel,
  });
  $('#sleepBar').animate({
  height: myPet.sleepLevel
  });
  $('#moodBar').animate({
  height: myPet.moodLevel
  });

}
// var barHeight = percent * $element.width() / 100;
$(document).ready(function() {
$('#change').attr("src", 'img/r_gift.gif');
// Names Pet and starts Game //
  $('#nameMe').submit(function() {
    $('#change').attr("src", 'img/r_happy.gif');
    var audio1 = new Audio('sound/blip.wav');
    var audio2 = new Audio('sound/bloop.wav');
    var audio3 = new Audio('sound/bleep.wav');
    audio1.play();
    if ( $('#input').val() == '' ) { 
    } else {
      event.preventDefault();
      $('form#nameMe').hide();
      $('.hideMe').show();
      var myPet = Object.create(Tamagotcha);
      myPet.initialize($('#input').val());
      $('#title').text("Lil'" + myPet.name.charAt(0).toUpperCase() + myPet.name.slice(1));
      $('#level').text("LVL " + myPet.ageLevel);
  // Stat Reduction Timer //
      var time = setInterval(function() {
        countDown(myPet);
  // Death conditon //
        if (myPet.foodLevel <= 0 || myPet.sleepLevel <= 0 || myPet.moodLevel <= 0) {
        clearInterval(time);
        $('#message').text("You killed him, you monster...");
        $('#change').attr("src", 'img/r_rip.gif');
        }
      },1000);
  // Level Up Timer //
        setInterval(function() {
          myPet.ageLevel +=1
        }, 100000);
  // Button animation and cooldown //
      $('.button').click(function(){
        event.preventDefault();
        $(".button").attr("disabled", "disabled");
        $('.button').fadeTo(500,0.7)
        setTimeout(function(){
          $('.button').fadeTo(250,1)
          $(".button").removeAttr("disabled");
        }, 3000);
      });
  // Feed button //
      $('#feed').click(function(){
      audio2.play();
       if (myPet.foodLevel < 90) {
          myPet.foodLevel += 10;
          audio3.play();
          $('#message').text("Wow, he gobbled that right up...");
          $('#change').attr("src", 'img/r_eat.gif');
          $('#foodBar').css("height",myPet.foodLevel)
        } else {
          audio2.play();
          $('#message').text("He's pretty stuffed already...");
          $('#change').attr("src", 'img/r_angry.gif');
          myPet.moodLevel -= 10;
        };
      });
  // Sleep button //
    $('#sleep').click(function(){
      if (myPet.sleepLevel < 90) {
        myPet.sleepLevel += 10;
        audio3.play();
        $('#message').text("Shhh, he's sleeping...");
        $('#change').attr("src", 'img/r_sleep.gif');
        $('#sleepBar').css("height",myPet.sleepLevel)
      } else {
        audio2.play();
        $('#message').text("He's really not that tired...");
        $('#change').attr("src", 'img/r_angry.gif');
        myPet.moodLevel -= 10;
      };
    });
  // Play button //
    $('#play').click(function(){
      audio2.play();
      if (myPet.sleepLevel > 50) {
        myPet.sleepLevel -= 5;
        if (myPet.moodLevel < 90) {
          myPet.moodLevel += 10; 
          audio3.play();
          $('#message').text("Woah! Look at him go...");
          $('#change').attr("src", 'img/r_play.gif');
        } else {
          audio2.play();
          myPet.moodLevel += (100 - myPet.moodLevel) 
          $('#message').text("He plays with you, a little...");
          $('#change').attr("src", 'img/r_play.gif');
        }
      } else {
        $('#message').text("He's all tuckered out, poor guy...");
        $('#change').attr("src", 'img/r_angry.gif');
        myPet.moodLevel -= 10;
      };
    });
    }
  })
});


