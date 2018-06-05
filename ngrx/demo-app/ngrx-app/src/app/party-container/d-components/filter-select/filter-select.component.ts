import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import * as PartyFilterAction from '../../../actions/party-filter.actions';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {
  @Input() filters;
  @Output() updateFilter: EventEmitter<PartyFilterAction.PartyFilterActionsUnion> =
    new EventEmitter<PartyFilterAction.PartyFilterActionsUnion>();

  constructor() { }

  ngOnInit () {
    this.filters.forEach(filter => {
      console.log(filter.action);
    });
  }
}
