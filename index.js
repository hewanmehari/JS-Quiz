// 1. Create a CustomerOrder class with properties: orderId (string), items (array of objects with name, quantity, price), and status (string). Add a method 
// calculateTotal() that returns the total order amount. Write an async method processPayment() that simulates payment with a Promise that resolves after 2 seconds. 
// After calling the method, change the status to "paid" and print a success message.


class CustomerOrder {
  constructor(orderId, items) {
    this.orderId = orderId;
    this.items = items;
    this.status = 'pending';
  }

  calculateTotal() {
    let total = 0;
    for (let item of this.items) {
      total += item.quantity * item.price;
    }
    return total;
  }

  async processPayment() {
    console.log("Payment in process...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.status = "paid";
    console.log(`Payment successful for order ${this.orderId}`);
  }
}


const order = new CustomerOrder("C01", [
  { name: "Shoes", quantity: 2, price: 1500 },
  { name: "Phone", quantity: 1, price: 20000 }
]);

console.log("Total:", order.calculateTotal());
order.processPayment();

// 2. Create a TeamMember class that takes name, role, and an array of tasks (each task is an object with title and completed boolean). Write a prototype method 
// completeTask(taskTitle) that marks a task as completed. Write another method checkProgress() that returns a Promise resolving to "All tasks completed!" or rejecting
//  with "Pending tasks remaining" based on the state of the tasks array.

class TeamMember {
  constructor(name, role, tasks) {
    this.name = name;
    this.role = role;
    this.tasks = tasks;
  }

  completeTask(taskTitle) {
    for (let task of this.tasks) {
      if (task.title === taskTitle) {
        task.completed = true;
      }
    }
  }

  checkProgress() {
    return new Promise((resolve, reject) => {
      const allDone = this.tasks.every(task => task.completed);
      if (allDone) {
        resolve("All tasks completed!");
      } else {
        reject("Pending tasks remaining");
      }
    });
  }
}

const member = new TeamMember("Hewan", "Designer", [
  { title: "Drawing", completed: true },
  { title: "Design", completed: true }
]);

member.completeTask("Design");

member.checkProgress()
  .then(console.log)
  .catch(console.log);



// 3. Build a Candidate class with properties: name, position, and interviews (array of objects with date, status). Add a method scheduleInterview(date) that pushes a
//  new interview with status "pending". Then write an async function sendConfirmation() that returns a Promise that resolves after 1 second with a message "Interview 
//  confirmed with [name]", and log the message.

class Candidate {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.interviews = [];
  }

  scheduleInterview(date) {
    this.interviews.push({ date: date, status: "pending" });
  }

  async sendConfirmation() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const message = `Interview confirmed with ${this.name}`;
    console.log(message);
    return message;
  }
}

const candidate = new Candidate("Jermaine Cole", "Rapper");
candidate.scheduleInterview("2026-01-28");
candidate.sendConfirmation();


// 4.Design a Course class with properties: title, instructor, and students (array of student objects with name and progress). Add a method updateProgress(studentName,
//    value) that modifies the student’s progress. Create an async method generateCertificate(studentName) that returns a Promise resolving only if the progress is 100, 
//    otherwise reject with "Incomplete progress".


// class Course {
//   constructor(title, instructor, students) {
//     this.title = title;
//     this.instructor = instructor;
//     this.students = students;
//   }

//   updateProgress(studentName, value) {
//     for (let student of this.students) {
//       if (student.name === studentName) {
//         student.progress = value;
//       }
//     }
//   }

//   async generateCertificate(studentName) {
//     const student = this.students.find(s => s.name === studentName);
//     if (student && student.progress === 100) {
//       return `Certificate generated for ${studentName}`;
//     } else {
//       throw "Incomplete progress";
//     }
//   }
// }

// const course = new Course("JS 101", "Mr. Caleb", [
//   { name: "Betty", progress: 90 },
//   { name: "Mufasa", progress: 100 }
// ]);

// course.updateProgress("Betty", 100);

// course.generateCertificate("Betty")
//   .then(console.log)
//   .catch(console.log);

class Course {
  constructor(title, instructor, students = []) {
    this.title = title;
    this.instructor = instructor;
    this.students = students;
  }

  updateProgress(studentName, value) {
    const student = this.students.find(s => s.name === studentName);
    if (student) {
      student.progress = value;
    }
  }

  async generateCertificate(studentName) {
    const student = this.students.find(s => s.name === studentName);
    return new Promise((resolve, reject) => {
      if (student && student.progress === 100) {
        resolve(`Certificate generated for ${student.name}`);
      } else {
        reject("Incomplete progress");
      }
    });
  }
}
const course = new Course("JS 101", "Mr. Caleb", [
  { name: "Betty", progress: 90 },
  { name: "Mufasa", progress: 100 }
]);

course.updateProgress("Betty", 100);

course.generateCertificate("Betty")
  .then(console.log)
  .catch(console.log);



// 5.Create a StockTracker class with a property watchlist (array of objects with symbol, threshold, currentPrice). Add a method updatePrice(symbol, newPrice) that
//  updates the stock’s current price. Write an async method checkAlerts() that loops through the watchlist and returns a Promise resolving with a list of stocks where 
//  currentPrice >= threshold, or rejecting with "No alerts triggered".

class StockTracker {
  constructor(watchlist) {
    this.watchlist = watchlist;
  }

  updatePrice(symbol, newPrice) {
    for (let stock of this.watchlist) {
      if (stock.symbol === symbol) {
        stock.currentPrice = newPrice;
      }
    }
  }

  async checkAlerts() {
    const triggered = this.watchlist.filter(stock => stock.currentPrice >= stock.threshold);
    if (triggered.length > 0) {
      return triggered;
    } else {
      throw "No alerts triggered";
    }
  }
}


const tracker = new StockTracker([
  { symbol: "AAA", threshold: 100, currentPrice: 1400},
  { symbol: "OOO", threshold: 120, currentPrice: 1250 }
]);

tracker.updatePrice("AAA", 1600);

tracker.checkAlerts()
  .then(alerts => console.log("Triggered Alerts:", alerts))
  .catch(console.log);

