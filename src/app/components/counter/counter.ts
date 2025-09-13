import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <div class="rounded-md border-2 border-red-600 p-4">
      <h4 class="mb-2 text-lg font-bold">Angular Counter Component</h4>
      <p class="mb-2">Current Count: {{ count() }}</p>
      <button
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer"
        (click)="increment()"
      >
        Click Me
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  startValue = input(0);
  countChange = output<number>();

  readonly count = signal(0);

  constructor() {
    // When input changes, update internal count
    effect(() => {
      this.count.set(this.startValue());
    });
  }

  public increment() {
    this.count.update((c) => c + 1);
    this.countChange.emit(this.count());
  }
}
