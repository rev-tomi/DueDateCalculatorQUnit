QUnit.test("dueDate", function(assert) {
  
  var assertDueDate = function(start, hours, end, msg, verbose) {
    var dueDate = dueDateCalculator(start, hours),
        message = verbose ? msg + " actual: " + dueDate.toString() + " vs expected: " + end.toString() : msg;
    assert.equal(dueDate.getTime(), end.getTime(), message);
  },
  now = new Date();
  
  assertDueDate(now, 0, now, "Zero hours is identity");
  assertDueDate(new Date(2014, 11, 22, 9), 2, new Date(2014, 11, 22, 11), "Adding some time within the same day");
  assertDueDate(new Date(2014, 11, 22, 16, 0, 0, 0), 2, new Date(2014, 11, 23, 10), "Adding some time that ends the next day", true);
});

QUnit.test("workTimeSchedule", function(assert) {
  var workTimeSchedule = dueDateCalculator.workTimeSchedule;
  
  assert.ok(workTimeSchedule.isWorkPeriod(new Date(2014, 12, 9, 9)), "start of period");
  assert.ok( ! workTimeSchedule.isWorkPeriod(new Date(2014, 12, 9, 17)), "end of period");
  
  assert.equal(workTimeSchedule.startOfNextPeriod(new Date(2014, 11, 9, 11)).getTime(), new Date(2014, 11, 9, 11).getTime(), "Inside of a period.");
  assert.equal(workTimeSchedule.startOfNextPeriod(new Date(2014, 11, 9, 7)).getTime(), new Date(2014, 11, 9, 9).getTime(), "Between two worksdays");
  assert.equal(workTimeSchedule.startOfNextPeriod(new Date(2014, 11, 26, 19)).getTime(), new Date(2014, 11, 29, 9).getTime(), "Weekend inbetween");
  
  assert.equal(0, workTimeSchedule.millisToEndOfCurrentPeriod(new Date(2014, 11, 9, 19)), "Millis to end - outside of work period");
  assert.equal(3600000, workTimeSchedule.millisToEndOfCurrentPeriod(new Date(2014, 11, 9, 16)), "Millis to end - one hour");
});
