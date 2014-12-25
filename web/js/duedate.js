var dueDateCalculator = function() {
  
  var start = 9, end = 17;
  
  return function(startDate, hours) {
    var diffMillis = hours * 60 * 60 * 1000,
        startMillis = startDate.getTime();
    return new Date(startMillis + diffMillis);
  };
}();

dueDateCalculator.workTimeSchedule = {
  
  'millisAsDateTrimmedToHours' : function(millis) {
    var untrimmed = new Date(millis);
    return new Date(untrimmed.getFullYear(), untrimmed.getMonth(), untrimmed.getDate(), untrimmed.getHours());
  },
  
  'isWorkPeriod' : function(time) {
    var day = time.getDay();
        hour = time.getHours();
    return 0 < day && day < 6 && 8 <= hour && hour < 16;
  },
  
  'startOfNextPeriod' : function() {
    var hourInMillisec = 60 * 60 * 1000,
        dayInMillisec = 24 * hourInMillisec,
        adjustHours = function(date) {
          var result = new Date(date.getTime());
          if (16 <= result.getHours()) {
            result = new Date(result.getTime() + (24 - result.getHours()) * hourInMillisec);
          }
          return new Date(result.getTime() + (8 - result.getHours()) * hourInMillisec);
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
      var result = new Date(date.getTime());
      if (this.isWorkPeriod(date)) {
        return date;
      }
      
      result = adjustHours(result);
      result = adjustDays(result);
      return this.millisAsDateTrimmedToHours(result.getTime());
    };
  }(),
  
  'millisToEndOfCurrentPeriod' : function (date) {
    var endOfPeriod = new Date(date.getTime());
    if ( ! this.isWorkPeriod(date)) {
      return 0;
    }
    endOfPeriod.setHours(16);
    endOfPeriod = this.millisAsDateTrimmedToHours(endOfPeriod.getTime());
    return endOfPeriod.getTime() - date.getTime();
  },
};
