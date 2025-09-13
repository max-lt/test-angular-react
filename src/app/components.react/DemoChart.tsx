import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Component, ChangeDetectionStrategy, effect, input, inject, Injector } from '@angular/core';
import { ReactWrapper } from './wrapper';

// The React component that renders a simple line chart using Recharts
function DemoChart({ chartData = [] }: { chartData?: any[] }) {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-80 w-128 items-center justify-center rounded-md border border-dashed border-gray-300">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  return (
    <LineChart
      width={512}
      height={320}
      data={chartData}
      className="rounded-md border-2 border-blue-600 p-4"
    >
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </LineChart>
  );
}

// The Angular wrapper component for the DemoChart React component
@Component({
  selector: 'app-demo-chart',
  standalone: true,
  template: '', // The template remains empty, the base class handles rendering.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoChartWrapper extends ReactWrapper {
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
