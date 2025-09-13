import { Component, effect, signal, NgZone } from '@angular/core';
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

  constructor(private router: Router, private zone: NgZone) {
    super();

    console.log('ArticlesWrapperComponent initialized');

    this.path.set(this.router.url.replace('/articles', '') || '/');

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.startsWith('/articles')) {
          this.path.set(event.url.replace('/articles', '') || '/');
        }
      });

    effect(() => {
      this.render(ArticlesComponent, {
        path: this.path(),
        onNavigate: (to: string) =>
          this.zone.run(() => this.router.navigateByUrl(`/articles${to}`)),
      });
    });
  }
}
