import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('FAQ | M&G Wedding');
  }

  ngOnInit(): void {}
}
