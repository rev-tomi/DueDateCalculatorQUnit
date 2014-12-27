var dueDateCalculator = function() {
  
  var HOURS_IN_MILLISEC = 60 * 60 * 1000;
  
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
  
  return function(startDate, hours, workTimeSchedule) {
    return calculatorImpl(startDate, hours * HOURS_IN_MILLISEC, workTimeSchedule || dueDateCalculator.workTimeSchedule);
  };
}();

dueDateCalculator.workTimeSchedule = function() {
  
  var START = 9, END = 17, result = {
    
    'millisAsDateTrimmedToHours' : function(millis) {
      var untrimmed = new Date(millis);
      return new Date(untrimmed.getFullYear(), untrimmed.getMonth(), untrimmed.getDate(), untrimmed.getHours());
    },
    
    'isWorkPeriod' : function(time) {
      var day = time.getDay(),
          hour = time.getHours();
      return 0 < day && day < 6 && START <= hour && hour < END;
    },
    
    'startOfNextPeriod' : function() {
      var HOURS_IN_MILLISEC = 60 * 60 * 1000,
          DAYS_IN_MILLISEC = 24 * HOURS_IN_MILLISEC,
          adjustHours = function(date) {
            var result = new Date(date.getTime());
            if (END <= result.getHours()) {
              result = new Date(result.getTime() + (24 - result.getHours()) * HOURS_IN_MILLISEC);
            }
            return new Date(result.getTime() + (START - result.getHours()) * HOURS_IN_MILLISEC);
          },
          adjustDays = function(date) {
            var difference = 0;
            if (date.getDay() == 6) {
              difference += 2 * DAYS_IN_MILLISEC;
            } else if (date.getDay() == 0) {
              difference += DAYS_IN_MILLISEC;
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
      endOfPeriod.setHours(END);
      endOfPeriod = this.millisAsDateTrimmedToHours(endOfPeriod.getTime());
      return endOfPeriod.getTime() - date.getTime();
    },
  };
  
  return result;
}();
