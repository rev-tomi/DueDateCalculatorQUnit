var dueDateCalculator = function() {
  
  var hoursInMillisec = 60 * 60 * 1000;
  
  var calculatorImpl = function (startDate, millis, workTimeSchedule) {
    var result = new Date(startDate.getTime()), millisLeft = millis, timeLeftInThisPeriod = 0;;
    while (0 < millisLeft) {
      if ( ! workTimeSchedule.isWorkPeriod(result)) {
        result = workTimeSchedule.startOfNextPeriod(result);
      }
      
      timeLeftInThisPeriod = workTimeSchedule.millisToEndOfCurrentPeriod(result);
      if (millisLeft <= timeLeftInThisPeriod) {
        result = new Date(result.getTime() + millisLeft);
        millisLeft = 0;
      } else {
        result = new Date(result.getTime() + timeLeftInThisPeriod);
        millisLeft -= timeLeftInThisPeriod;
      }
    }
    return result;
  };
  
  return function(startDate, hours) {
    return calculatorImpl(startDate, hours * hoursInMillisec, dueDateCalculator.workTimeSchedule);
  };
}();

dueDateCalculator.workTimeSchedule = {
  
  // TODO extract start-end constants
  
  'millisAsDateTrimmedToHours' : function(millis) {
    var untrimmed = new Date(millis);
    return new Date(untrimmed.getFullYear(), untrimmed.getMonth(), untrimmed.getDate(), untrimmed.getHours());
  },
  
  'isWorkPeriod' : function(time) {
    var day = time.getDay();
        hour = time.getHours();
    return 0 < day && day < 6 && 9 <= hour && hour < 17;
  },
  
  'startOfNextPeriod' : function() {
    var hourInMillisec = 60 * 60 * 1000,
        dayInMillisec = 24 * hourInMillisec,
        adjustHours = function(date) {
          var result = new Date(date.getTime());
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
    endOfPeriod.setHours(17);
    endOfPeriod = this.millisAsDateTrimmedToHours(endOfPeriod.getTime());
    return endOfPeriod.getTime() - date.getTime();
  },
};
