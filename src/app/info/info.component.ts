import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Story | M&G Wedding');
  }

  ngOnInit(): void {}
}
