var dueDateCalculator = function(startDate, hours) {
  var diffMillis = hours * 60 * 60 * 1000,
      startMillis = startDate.getTime();
  
  return new Date(startMillis + diffMillis);
};
