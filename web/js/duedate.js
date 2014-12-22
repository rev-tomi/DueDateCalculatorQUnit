var dueDateCalculator = function() {
  
  return function(startDate, hours) {    
    var diffMillis = hours * 60 * 60 * 1000,
        startMillis = startDate.getTime();  
    return new Date(startMillis + diffMillis);
  };
}();
