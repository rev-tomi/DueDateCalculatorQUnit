QUnit.test("dueDate Identity", function(assert) {
  var now = new Date();
  var dueDate = dueDateCalculator(new Date(), 0);
  assert.equal(dueDate.getMilliseconds(), now.getMilliseconds(), "Zero hours is identity");
});

QUnit.test("dueDate same day", function(assert) {
  var day = new Date(2014, 12, 22, 9, 0, 0, 0),
      hours = 2,
      dueDate = dueDateCalculator(day, hours);
  assert.equal(dueDate.getMilliseconds(), new Date(2014, 12, 22, 11, 0, 0, 0).getMilliseconds(), "Adding some time within the same day");
});
