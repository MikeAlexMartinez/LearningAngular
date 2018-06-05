import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonListComponent {
  /**
   * "dumb" components do nothing but display data based in input
   * and emit relevant event back up for parent, or "container"
   * components to handle.
   */
  @Input() people;
  @Output() addGuest = new EventEmitter();
  @Output() removeGuest = new EventEmitter();
  @Output() removePerson = new EventEmitter();
  @Output() toggleAttending = new EventEmitter();
}
