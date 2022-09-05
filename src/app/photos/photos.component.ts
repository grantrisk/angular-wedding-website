import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle('Photos | M&G Wedding');
  }

  ngOnInit(): void {
  }

}
