import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DfpService } from '@wwei/dfp';

@Component({
  selector: 'app-same',
  templateUrl: './same.component.html',
})
export class SameComponent {
  id = 1;

  ad = {
    id: 'dfpad-id',
    unitPath: '/6355419/Travel',
    size: [728, 90] as googletag.GeneralSize,
    targeting: { test: 'refresh' },
  };

  ads = [this.ad];

  constructor(private dfp: DfpService, active: ActivatedRoute) {
    active.params.subscribe((params) => {
      this.id = parseInt(params['id']) || 2;
    });
  }

  doAdd(): void {
    this.ads.push(this.ad);
  }

  doChange(): void {
    this.ad = Object.assign({}, this.ad);
  }

  doRefresh(slotId?: string): void {
    if (slotId) {
      googletag.pubads().refresh(this.dfp.getSlots([slotId]));
    } else {
      googletag.pubads().refresh();
    }
  }
}
