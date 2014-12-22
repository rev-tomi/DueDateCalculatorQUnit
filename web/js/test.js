QUnit.test("dueDate Identity", function(assert) {
  var now = new Date();
  var dueDate = dueDateCalculator(new Date(), 0);
  assert.equal(dueDate.getTime(), now.getTime(), "Zero hours is identity");
});

QUnit.test("dueDate same day", function(assert) {
  var day = new Date(2014, 12, 22, 9),
      hours = 2,
      dueDate = dueDateCalculator(day, hours);
  assert.equal( dueDate.getTime(),
                new Date(2014, 12, 22, 11).getTime(),
                "Adding some time within the same day");
});

QUnit.test("dueDate accross a day", function(assert) {
  var day = new Date(2014, 11, 22, 16, 0, 0, 0),
      hours = 2,
      dueDate = dueDateCalculator(day, hours);
  assert.equal( dueDate.getTime(),
                new Date(2014, 11, 23, 10).getTime(),
                "Adding some time that ends the next day");
  
});
