import { Observable } from 'rxjs';

export type Selector<T, V> =
  (state: Observable<T>) => Observable<V>;
