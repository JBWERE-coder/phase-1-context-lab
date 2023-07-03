/* Your Code Here */
// Employee record constructor function
function createEmployeeRecord(recordArray) {
    return {
      firstName: recordArray[0],
      familyName: recordArray[1],
      title: recordArray[2],
      payPerHour: recordArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(recordsArray) {
    return recordsArray.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event to an employee's record
  function createTimeInEvent(dateString) {
    const [date, hour] = dateString.split(" ");
    this.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour) });
    return this;
  }
  
  // Function to add a timeOut event to an employee's record
  function createTimeOutEvent(dateString) {
    const [date, hour] = dateString.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour) });
    return this;
  }
  
  // Function to calculate the hours worked on a specific date for an employee
  function hoursWorkedOnDate(dateString) {
    const timeInEvent = this.timeInEvents.find(event => event.date === dateString);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === dateString);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Function to calculate the wages earned on a specific date for an employee
  function wagesEarnedOnDate(dateString) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateString);
    const wagesEarned = hoursWorked * this.payPerHour;
    return wagesEarned;
  }
   
  // Function to find an employee by first name in a collection of employee records
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  // Function to calculate the total payroll for an array of employee records
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0);
    return totalPayroll;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

