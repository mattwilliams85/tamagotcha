describe("tamagotcha", function() {
  describe("initialize", function() {
    it("Sets the name and the pet's starting levels", function() {
      var myPet = Object.create(Tamagotcha);
      myPet.initialize("lil dragon");
      myPet.name.should.equal("lil dragon");
      myPet.foodLevel.should.equal(10);
      myPet.sleepLevel.should.equal(10);
      myPet.moodLevel.should.equal(10);
    });
  });

  // describe("countDown", function() {
  //   it("No stat goes below 0 without stopping", function() {
  //     var myPet = Object.create(Tamagotcha);
  //     myPet.countDown();
  //     myPet.foodLevel.should.not.equal(-2);
  //   });
  // });

  describe("isAlive", function() {
    it("Is alive if all levels are above 0", function() {
      var myPet = Object.create(Tamagotcha);
      myPet.statusCheck().should.equal(true);
    });

    it("Is dead if any level reaches 0", function() {
      var myPet = Object.create(Tamagotcha);
      myPet.foodLevel = 0;
      myPet.statusCheck().should.equal(false);
    });
  });
});
