import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactCounter } from './ReactCounter';

class ReactCounterWrapper extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private props: any = {};

  // 'connectedCallback' is called when the element is added to the DOM
  connectedCallback() {
    this.root = ReactDOM.createRoot(this);
    this.mount();
  }

  // 'attributeChangedCallback' is called when an observed attribute changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // We update the props and re-render
    this.props[name] = newValue;
    this.mount();
  }

  // 'static get observedAttributes' defines which attributes to watch
  static get observedAttributes() {
    // Must correspond to the prop names in kebab-case
    return ['startvalue'];
  }

  // 'disconnectedCallback' is called when the element is removed from the DOM
  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private mount() {
    // We convert the attributes (which are strings) to the correct types for React
    const startValueProp = this.props.startvalue ? parseInt(this.props.startvalue, 10) : 0;

    // We create the function to handle the event coming up from React
    const handleCountChange = (event: any) => {
      // We propagate the event as a real DOM event
      this.dispatchEvent(new CustomEvent('countChange', { detail: event.detail }));
    };

    const element = React.createElement(ReactCounter, {
      startValue: startValueProp,
      onCountChange: handleCountChange,
    });

    if (this.root) {
      this.root.render(element);
    }
  }
}

// We define the custom element in the browser
customElements.define('react-counter', ReactCounterWrapper);
