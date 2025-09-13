import {
  Component,
  ChangeDetectionStrategy,
  effect,
  input,
  output,
  inject,
  Injector,
} from '@angular/core';

// Import abstract react wrapper
import { ReactWrapper } from './wrapper';

// Import the React component we want to wrap
import { ReactCounter } from './ReactCounter';

@Component({
  selector: 'app-react-counter',
  standalone: true,
  template: '', // The template remains empty, the base class handles rendering.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactCounterComponent extends ReactWrapper {
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
        const props = {
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
