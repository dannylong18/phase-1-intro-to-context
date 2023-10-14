
let testEmployee = ['Gray', 'Worm', 'Security', 1]

function createEmployeeRecord (arr) {
    let [firstName, famName, title, payPerHour] = arr
    let jsObj = {
            "firstName" : firstName,
            "familyName" : famName,
            "title" : title,
            "payPerHour" : payPerHour,
            "timeInEvents" : [],
            "timeOutEvents" : [],
            }
        
        return jsObj
}

function createEmployeeRecords (array) {
    return array.map(element => {
        return createEmployeeRecord(element)
    })
}

  
function createTimeInEvent (obj, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let newEvent = {
        type : "TimeIn",
        hour : parseInt(time),
        date : date,
    }
    obj.timeInEvents.push(newEvent)
    return obj
}

function createTimeOutEvent (obj, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let newEvent = {
        type : "TimeOut",
        hour : parseInt(time),
        date : date,
    }
    obj.timeOutEvents.push(newEvent)
    return obj
    }

/*function hoursWorkedOnDate (employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents
    let timeOut = employeeRecord.timeOutEvents
    
    let filteredTimeIn = timeIn.find(event => event.date === date)
    let filteredTimeOut = timeOut.find(event => event.date === date)

    let timeInHours = parseInt(filteredTimeIn.hour.slice(0,2))
    let timeOutHours = parseInt(filteredTimeOut.hour.slice(0,2))

    let hoursWorked = timeOutHours - timeInHours

    return hoursWorked

}*/

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
      const timeInHours = Math.floor(timeIn.hour / 100);
      const timeOutHours = Math.floor(timeOut.hour / 100);
  
      const hoursWorked = timeOutHours - timeInHours;
  
      return hoursWorked;
    }
  
    return 0
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    const payOwed = hoursWorked * payRate;
  
    return payOwed;
  }

  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalPay = dates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalPay;
  }

  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  
    return totalPayroll;
  }
  