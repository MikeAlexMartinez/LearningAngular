import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter',
  template: `
    <div class="content">
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <h3>{{counter$ | async}}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  counter$: Observable<number>;

  constructor (
    private store: Store<number>
  ) {
    this.counter$ = this.store.select('counter');
  }

  increment() {
    this.store.dispatch({ type: 'INCREMENT' });
  }

  decrement() {
    this.store.dispatch({ type: 'DECREMENT' });
  }
}
