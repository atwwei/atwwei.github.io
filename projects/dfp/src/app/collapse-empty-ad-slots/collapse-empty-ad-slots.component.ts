import { Component } from '@angular/core';
import { DfpService } from '@wwei/dfp';

@Component({
  selector: 'app-collapse-empty-ad-slots',
  templateUrl: './collapse-empty-ad-slots.component.html',
})
export class CollapseEmptyAdSlotsComponent {
  constructor(private dfp: DfpService) {
    this.setOptions();
  }

  setOptions(): void {
    this.dfp.cmd(() => {
      googletag.pubads().collapseEmptyDivs();
    });
  }
}
