QUnit.test("dueDate", function(assert) {
  
  var assertDueDate = function(start, hours, end, msg) {
    var dueDate = dueDateCalculator(start, hours);
    assert.equal(dueDate.getTime(), end.getTime(), msg);
  },
  now = new Date();
  
  assertDueDate(now, 0, now, "Zero hours is identity");
  assertDueDate(new Date(2014, 12, 22, 9), 2, new Date(2014, 12, 22, 11), "Adding some time within the same day");
  assertDueDate(new Date(2014, 11, 22, 16, 0, 0, 0), 2, new Date(2014, 11, 23, 10), "Adding some time that ends the next day");
});
