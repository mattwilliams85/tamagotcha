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
  console.log(myPet.ageLevel)
  $('h4').text("LVL " +myPet.ageLevel);
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
// Death check //

}
// var barHeight = percent * $element.width() / 100;
$(document).ready(function(){

// Names Pet and starts Game //
  $('#nameMe').submit(function(){
    event.preventDefault();
    $('form#nameMe').hide();
    $('.hideMe').show();
    var myPet = Object.create(Tamagotcha);
    myPet.initialize($('#input').val());
    $('span').text(myPet.name.toUpperCase());
// Stat Reduction Timer //
    var time = setInterval(function() {
      countDown(myPet);
// Death conditon //
      if (myPet.foodLevel <= 0 || myPet.sleepLevel <= 0 || myPet.moodLevel <= 0) {
        clearInterval(time);
      }
      if (myPet.foodLevel <= 0) {
        console.log("RIP :'(")
      }
    },2500);
// Level Up Timer //
      setTimeout(myPet.ageLevel,5000);
// Button animation and cooldown //
    $('.button').click(function(){
      event.preventDefault();
      $(".button").attr("disabled", "disabled");
      $('.button').fadeTo(500,0.5)
      setTimeout(function(){
        $('.button').fadeTo(250,1)
        $(".button").removeAttr("disabled");
      }, 3000);
    });
// Feed button //
    $('#feed').click(function(){
     if (myPet.foodLevel < 90) {
        myPet.foodLevel += 10;
        $('#foodBar').css("height",myPet.foodLevel)
      } else {
        $('#message').text("He's not hungry right now...");
        myPet.moodLevel -= 10;
      };
    });
// Sleep button //
  $('#sleep').click(function(){
       if (myPet.sleepLevel < 90) {
        myPet.sleepLevel += 10;
        $('#sleepBar').css("height",myPet.sleepLevel)
      } else {
        $('#message').text("He's not sleepy right now...");
        myPet.moodLevel -= 10;
      };
    });
  });
});


