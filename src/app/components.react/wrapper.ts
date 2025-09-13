import { OnDestroy, AfterViewInit, ElementRef, Directive, inject } from '@angular/core';
import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';

// We use @Directive instead of @Component because we have no template or selector of our own.
// The child class will be a @Component.
@Directive()
export abstract class ReactWrapper implements AfterViewInit, OnDestroy {
  protected hostElementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private root: Root | null = null;

  ngAfterViewInit() {
    this.root = createRoot(this.hostElementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.unmount();
    }
  }

  // The render method is called by the child with the exact props.
  protected render<P extends {}>(
    component: React.ComponentType<P>,
    props: React.ComponentProps<typeof component>
  ): void {
    if (this.root) {
      const reactElement = createElement(component, props);
      this.root.render(reactElement);
    }
  }
}
