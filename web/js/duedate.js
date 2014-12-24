var dueDateCalculator = function() {
  
  var start = 9, end = 17;
  
  return function(startDate, hours) {   
    var diffMillis = hours * 60 * 60 * 1000,
        startMillis = startDate.getTime();  
    return new Date(startMillis + diffMillis);
  };
}();

dueDateCalculator.workTimeSchedule = {
  
  'isWorkPeriod' : function(time) {
    var day = time.getDay();
        hour = time.getHours();
    return 0 < day && day < 6 && 9 <= hour && hour < 17;
  },
  
  'startOfNextPeriod' : function(time) {
    var milliseconds = time.getTime(),
        result = new Date(milliseconds),
        hourInMillisec = 60 * 60 * 1000,
        dayInMillisec = 24 * hourInMillisec,
        difference = 0,
        millisAsDateTrimmedToHours = function(millis) {
          var untrimmed = new Date(millis);
          return new Date(untrimmed.getFullYear(), untrimmed.getMonth(), untrimmed.getDate(), untrimmed.getHours());
        };
    
    if (time.getDay() == 6) {
      console.log('adding 2 days');
      difference += 2 * dayInMillisec;
    } else if (time.getDay() == 0) {
      console.log('adding 1 day');
      difference += dayInMillisec;
    }
    
    difference += (9 - time.getHours()) * hourInMillisec;
    
    console.log('original milliseconds: ' + milliseconds);
    console.log('difference: ' + difference);
    return millisAsDateTrimmedToHours(milliseconds + difference);
  },
};
