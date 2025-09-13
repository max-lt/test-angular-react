import { Component, effect, signal, NgZone, inject, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReactWrapper } from './wrapper';
import { ArticlesComponent } from './Articles';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  template: '',
})
export class ArticlesWrapperComponent extends ReactWrapper {
  path = signal('');
  private injector = inject(Injector);

  constructor(private router: Router, private zone: NgZone) {
    super();
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    this.path.set(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.startsWith('/articles')) {
          this.path.set(event.url);
        }
      });

    effect(
      () => {
        this.render(ArticlesComponent, {
          key: this.path(),
          path: this.path(),
          onNavigate: (to: string) => {
            const fullPath = `/articles${to}`;
            this.zone.run(() => this.router.navigateByUrl(fullPath));
          },
        });
      },
      { injector: this.injector }
    );
  }
}
