import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
  @Input() iconURL: string = '';
  constructor() {}

  ngOnInit(): void {}
}
