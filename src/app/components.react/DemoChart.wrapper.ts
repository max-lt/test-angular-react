import React from 'react';
import ReactDOM from 'react-dom/client';
import { DemoChart } from './DemoChart';

class DemoChartWrapper extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private props: any = {};

  set data(value: any[]) {
    this.props.chartdata = value;
    this.mount();
  }

  connectedCallback() {
    this.root = ReactDOM.createRoot(this);
    this.mount();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private mount() {
    const element = React.createElement(DemoChart, {
      chartData: this.props.chartdata,
    });

    if (this.root) {
      this.root.render(element);
    }
  }
}

customElements.define('demo-chart', DemoChartWrapper);
