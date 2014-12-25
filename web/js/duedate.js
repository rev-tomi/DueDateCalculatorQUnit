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
        },
        adjustHours = function(date) {
          var result = date;
          if (17 <= result.getHours()) {
            result = new Date(result.getTime() + (24 - result.getHours()) * hourInMillisec);
          }
          return new Date(result.getTime() + (9 - result.getHours()) * hourInMillisec);
        },
        adjustDays = function(date) {
          var difference = 0;
          if (date.getDay() == 6) {
            difference += 2 * dayInMillisec;
          } else if (date.getDay() == 0) {
            difference += dayInMillisec;
          }
          return new Date(date.getTime() + difference);
        };
    
    return function(date) {
      var result = date;
      if (this.isWorkPeriod(date)) {
        return date;
      }
      
      result = adjustHours(result);
      result = adjustDays(result);
      return millisAsDateTrimmedToHours(result.getTime());
    };
  }(),
};
