import React from 'react';
import { useState, useEffect } from 'react';
import {
  Component,
  ChangeDetectionStrategy,
  effect,
  input,
  output,
  inject,
  Injector,
} from '@angular/core';

import { ReactWrapper } from './wrapper';

type ReactCounterProps = {
  startValue?: number;
  onCountChange?: (event: { detail: { value: number } }) => void;
};

// The React component that implements a simple counter
function ReactCounter({ startValue = 0, onCountChange }: ReactCounterProps) {
  const [count, setCount] = useState(startValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    // Call the event handler prop when the count changes
    if (onCountChange) {
      onCountChange({ detail: { value: newCount } });
    }
  };

  // Update internal state if the prop changes
  useEffect(() => setCount(startValue), [startValue]);

  return (
    <div className="rounded-md border-2 border-blue-600 p-4">
      <h4 className="mb-2 text-lg font-bold">React Counter Component</h4>
      <p className="mb-2">Current Count: {count}</p>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer"
        onClick={increment}
      >
        Click Me
      </button>
    </div>
  );
}

// The Angular wrapper component for the ReactCounter React component
@Component({
  selector: 'app-react-counter',
  standalone: true,
  template: '', // The template remains empty, the base class handles rendering.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactCounterWrapper extends ReactWrapper {
  // We use the new syntax for inputs and outputs
  startValue = input<number>(0);
  countChange = output<number>();

  private injector = inject(Injector);

  override ngAfterViewInit() {
    // We first call the base class method to create the React root.
    super.ngAfterViewInit();

    // We create the effect here, once we are sure the view is initialized.
    // We must pass the injector to it because we are no longer in the constructor context.
    effect(
      () => {
        const props: React.ComponentProps<typeof ReactCounter> = {
          startValue: this.startValue(), // We read the most recent value of the signal
          onCountChange: (event: any) => {
            this.countChange.emit(event.detail.value);
          },
        };

        // We call the parent's render method which updates the React component
        this.render(ReactCounter, props);
      },
      { injector: this.injector }
    );
  }
}
