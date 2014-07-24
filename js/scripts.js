// PROTOTYPE //
var Tamagotcha = {
  // Checks if Tamagotcha is still alive //
  statusCheck: function() {
    if (this.foodLevel === 0) {
      return false;
      console.log("YOU KILLED HIM")
    } else {
      return true;
    }
  },
  // Initializes starting stats for Tamagotcha //
  initialize: function(initializedName) {
    this.name = initializedName;
    this.foodLevel = 100;
    this.sleepLevel = 100;
    this.moodLevel = 100;
  },
}

// Stat depreciation over time //


var countDown = function(myPet) {
  myPet.foodLevel -= 5;
  myPet.sleepLevel -= 5;
  myPet.moodLevel -= 2.5;
  $('#foodNum').text(myPet.foodLevel);
  $('#sleepNum').text(myPet.sleepLevel);
  $('#moodNum').text(myPet.moodLevel);
// Stat bar animations //
  $('#foodBar').animate({
  height: myPet.foodLevel
  });
  $('#sleepBar').animate({
  height: myPet.sleepLevel
  });
  $('#moodBar').animate({
  height: myPet.moodLevel
  });
// Death check //

}

$(document).ready(function(){

// Names Pet and starts Game //
  $('#nameMe').submit(function(){
    event.preventDefault();
    $('.hideMe').show();
    var myPet = Object.create(Tamagotcha);
    myPet.initialize($('#input').val());
    countDown(myPet);
    var time = setInterval(function() {
    $('span').text(myPet.name.toUpperCase());


// Death conditon //
    // if (myPet.foodLevel <= 0 || myPet.sleepLevel <= 0 || myPet.moodLevel <= 0) {
    //   clearInterval(time);
    // }
    if (myPet.foodLevel <= 0) {
      console.log("RIP :'(")
    }
    },1000);
// Feeds Tamagotcha //
    $('#feed').click(function(){
      event.preventDefault();
      $(".button").attr("disabled", "disabled");
      $('.button').fadeTo(500,0.5)
      setTimeout(function(){
        $('.button').fadeTo(250,1)
        $(".button").removeAttr("disabled");
      }, 3000);
      if (myPet.foodLevel < 90) {
        myPet.foodLevel += 5;
        $('#foodBar').css("height",myPet.foodLevel)
      } else {
        $('#message').text("He's not hungry right now...");
      }

    });
  });
});


