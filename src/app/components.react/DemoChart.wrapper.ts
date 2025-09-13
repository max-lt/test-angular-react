import { Component, ChangeDetectionStrategy, effect, input, inject, Injector } from '@angular/core';

// Import abstract react wrapper
import { ReactWrapper } from './wrapper';

// Import the React component we want to wrap
import { DemoChart } from './DemoChart';

@Component({
  selector: 'app-demo-chart',
  standalone: true,
  template: '', // The template remains empty, the base class handles rendering.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoChartComponent extends ReactWrapper {
  // Input for the chart data
  data = input<any[]>([]);

  private injector = inject(Injector);

  override ngAfterViewInit() {
    // We first call the base class method to create the React root.
    super.ngAfterViewInit();

    // We create the effect here, once we are sure the view is initialized.
    effect(
      () => {
        const props: React.ComponentProps<typeof DemoChart> = {
          chartData: this.data(), // We read the most recent value of the signal
        };

        // We call the parent's render method which updates the React component
        this.render(DemoChart, props);
      },
      { injector: this.injector }
    );
  }
}
