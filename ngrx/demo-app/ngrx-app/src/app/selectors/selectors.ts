import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export const percentAttending = () => {
  return state => state
    // build on previous selectors
    .pipe(
      map((p: any[]) => {
        const totalAttending = p.filter(person => person.attending).length;
        const total = p.length;
        return total > 0 ? (totalAttending / total) * 100 : 0;
      })
    );
};
