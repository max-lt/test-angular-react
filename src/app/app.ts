import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CounterComponent } from './components/counter';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CounterComponent],
  templateUrl: './app.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  readonly title = signal('My Angular App with a React Component');
  readonly count = signal(0);

  handleReactCountChange(event: any) {
    // The data from React is in event.detail
    const newCount = event.detail.value;
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
