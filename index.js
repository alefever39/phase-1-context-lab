let rawEmployeeData = [['t', 'b', 'a', 3], ['r', 'd', 's', 4]]
let allEmployeeRecords= createEmployeeRecords(rawEmployeeData)

allEmployeeRecords = allEmployeeRecords.map(record => createTimeInEvent.call(record, '2022-05-24 0500'))
allEmployeeRecords = allEmployeeRecords.map(record => createTimeOutEvent.call(record, '2022-05-24 1200'))
allEmployeeRecords = allEmployeeRecords.map(record => createTimeInEvent.call(record, '2022-05-25 0500'))
allEmployeeRecords = allEmployeeRecords.map(record => createTimeOutEvent.call(record, '2022-05-25 1200'))


// allEmployeeRecords = allEmployeeRecords.map(record => createTimeInEvent(record, '2022-05-24 0500'))
// allEmployeeRecords = allEmployeeRecords.map(record => createTimeOutEvent(record, '2022-05-24 1200'))
// allEmployeeRecords = allEmployeeRecords.map(record => createTimeInEvent(record, '2022-05-25 0500'))
// allEmployeeRecords = allEmployeeRecords.map(record => createTimeOutEvent(record, '2022-05-25 1200'))
console.log(allEmployeeRecords)

console.log(hoursWorkedOnDate.call(allEmployeeRecords[0], '2022-05-24'))

// console.log(calculatePayroll(allEmployeeRecords))

//////////////////////////////////////////////////////////

function createEmployeeRecord(rawEmployeeData) {
    return {
        firstName: rawEmployeeData[0],
        familyName: rawEmployeeData[1],
        title: rawEmployeeData[2],
        payPerHour: rawEmployeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(allRawEmployeeData) {
    let allEmployeeRecords = allRawEmployeeData.map(singleEmployee => createEmployeeRecord(singleEmployee));
    return allEmployeeRecords;
}

function createTimeInEvent(dateStamp) {
    const splitDateStamp = dateStamp.split(' ');
    const newTimeInEvent = {
        type: 'TimeIn',
        hour: parseInt(splitDateStamp[1]),
        date: splitDateStamp[0]
    };
    this.timeInEvents = [...this.timeInEvents, newTimeInEvent];
    return this;
}

function createTimeOutEvent(dateStamp) {
    const splitDateStamp = dateStamp.split(' ');
    const newTimeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(splitDateStamp[1]),
        date: splitDateStamp[0]
    };
    this.timeOutEvents = [...this.timeOutEvents, newTimeOutEvent];
    return this;
}


function hoursWorkedOnDate(date) {
    const dateInHour = this.timeInEvents.find(event => event.date === date).hour;
    const dateOutHour = this.timeOutEvents.find(event => event.date === date).hour;
    return (dateOutHour - dateInHour)/100;
}


function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
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

