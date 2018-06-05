import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-party-stats',
  templateUrl: './party-stats.component.html',
  styleUrls: ['./party-stats.component.scss']
})
export class PartyStatsComponent {
  @Input() invited;
  @Input() attending;
  @Input() guests;
}
