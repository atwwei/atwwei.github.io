import { Component } from '@angular/core';
import { DfpService } from '@wwei/dfp';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
})
export class RefreshComponent {
  constructor(private dfp: DfpService) {}

  doRefresh(slotId?: string): void {
    if (slotId) {
      googletag.pubads().refresh(this.dfp.getSlots([slotId]));
    } else {
      googletag.pubads().refresh();
    }
  }

  doClear(): void {
    googletag.pubads().clear();
  }
}
