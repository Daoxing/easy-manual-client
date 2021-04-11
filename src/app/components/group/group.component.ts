import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  users: string[] = [];
  articles: string[] = [];
  constructor(private elemRef: ElementRef) {}

  ngOnInit(): void {}

  switchTab(e, index) {
    const titles: HTMLElement[] = Array.from(
      this.elemRef.nativeElement.getElementsByClassName('tab-title'),
    );

    titles.forEach((element, i) => {
      index === i
        ? element.classList.add('active-title')
        : element.classList.remove('active-title');
    });

    const contents: HTMLElement[] = Array.from(
      this.elemRef.nativeElement.getElementsByClassName('tab-content'),
    );
    contents.forEach((element, i) => {
      index === i
        ? element.classList.add('active-content')
        : element.classList.remove('active-content');
    });
  }
}
