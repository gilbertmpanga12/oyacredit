import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Funds Disbursed', cols: 1, rows: 1 },
          { title: 'Transactions', cols: 1, rows: 1 },
          { title: 'Funds Collected', cols: 1, rows: 1 },
          { title: 'Funds Available', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Funds Disbursed', cols: 1, rows: 1 },
        { title: 'Transactions', cols: 1, rows: 1 },
        { title: 'Funds Collected', cols: 1, rows: 1 },
        { title: 'Funds Available', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
