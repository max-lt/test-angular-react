import { Component, signal } from '@angular/core';
import { CounterComponent } from './counter';
import { ReactCounterWrapper } from '../components.react/ReactCounter';
import { DemoChartWrapper } from '../components.react/DemoChart';

@Component({
  selector: 'app-demo',
  imports: [CounterComponent, ReactCounterWrapper, DemoChartWrapper],
  templateUrl: './demo.html',
  styles: ``,
})
export class Demo {
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
    this.count.set(newCount);
  }

  handleAngularCountChange(newCount: number) {
    console.log(`Event from Angular! The new count is: ${newCount}`);
    this.count.set(newCount);
  }
}
