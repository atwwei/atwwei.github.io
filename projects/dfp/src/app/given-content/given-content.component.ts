import { Component } from '@angular/core';

@Component({
  selector: 'app-given-content',
  templateUrl: './given-content.component.html',
  styleUrls: ['./given-content.component.scss'],
})
export class GivenContentComponent {
  contents = [
    '<a href="https://www.npmjs.com/package/@wwei/dfp"><div class="ad-content">@wwei/dfp is an angular (>=12) module for displaying google dfp ads using Google Publisher Tag (Doubleclick GPT).<br> This library was generated with Angular CLI version 12.0.4.</div></a>',
  ];

  content: string = this.contents[0];
}
