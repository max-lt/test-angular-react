import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CounterComponent } from './components/counter';
import { DemoChartComponent } from './components.react/DemoChart.wrapper';
import { ReactCounterComponent } from './components.react/ReactCounter.wrapper';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CounterComponent, ReactCounterComponent, DemoChartComponent],
  templateUrl: './app.html',
})
export class App {
  readonly title = signal('My Angular App with a React Component');
  readonly count = signal(0);

  readonly chartData = signal([
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
  ]);

  handleReactCountChange(newCount: number) {
    console.log(`Event from React! The new count is: ${newCount}`);
    this.title.set(`The count from React is now ${newCount}!`);
    this.count.set(newCount);
  }

  handleAngularCountChange(newCount: number) {
    console.log(`Event from Angular! The new count is: ${newCount}`);
    this.title.set(`The count from Angular is now ${newCount}!`);
    this.count.set(newCount);
  }
}
