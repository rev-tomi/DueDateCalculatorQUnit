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
  
  'startOfNextPeriod' : function() {
    var hourInMillisec = 60 * 60 * 1000,
        dayInMillisec = 24 * hourInMillisec,
        millisAsDateTrimmedToHours = function(millis) {
          var untrimmed = new Date(millis);
          return new Date(untrimmed.getFullYear(), untrimmed.getMonth(), untrimmed.getDate(), untrimmed.getHours());
        };
    
    return function(time) {
      var milliseconds = time.getTime(),
          result = new Date(milliseconds),
          difference = 0;
      
      if (this.isWorkPeriod(time)) {
        return time;
      }
      
      if (17 <= time.getHours()) {
        milliseconds += (24 - time.getHours()) * hourInMillisec;
        time = new Date(milliseconds);
      }
      time = new Date(milliseconds + (9 - time.getHours()) * hourInMillisec);
      milliseconds = time.getTime();
      
      if (time.getDay() == 6) {
        difference += 2 * dayInMillisec;
      } else if (time.getDay() == 0) {
        difference += dayInMillisec;
      }
    
      return millisAsDateTrimmedToHours(milliseconds + difference);
    };
  }(),
};
