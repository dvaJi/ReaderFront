import { Component, OnInit, Input } from '@angular/core';
import Chapter from '../../models/chapter';

@Component({
  selector: 'app-release-card',
  templateUrl: './release-card.component.html',
  styleUrls: ['./release-card.component.scss']
})
export class ReleaseCardComponent implements OnInit {

  @Input() release: Chapter = null;
  @Input() isLoading = true;

  constructor() { }

  ngOnInit() { }

}
