// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle


export default class Player {
    constructor(name) {
      this.name = name;
      this.times = [];
    }
  
    recordTime(start, end) {
      const duration = (end - start)/1000;
      this.times.push(duration);
    }
  
    showStats() {
      const totalTime = this.times.reduce((sum, time) => sum + time, 0);
      let avgTime=0 ;
      if(this.times.length > 0){
        avgTime=totalTime / this.times.length;
      }
      
  
      console.log(`\n=================================`);
      console.log(`Game Summary for ${this.name}:`);
      console.log(`Total Time: ${totalTime.toFixed(2)} sec`);
      console.log(`Average Time per Riddle: ${avgTime.toFixed(2)} sec`);
      console.log(`=================================\n`);
    }
  }