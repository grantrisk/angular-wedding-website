import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('M&G Wedding');
  }

  ngOnInit(): void {
  }

}
