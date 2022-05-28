import { Component } from '@angular/core';
import {
  DfpService,
  RewardedSlotClosedEvent,
  RewardedSlotGrantedEvent,
} from '@wwei/dfp';

@Component({
  selector: 'app-display-rewarded-ad',
  templateUrl: './display-rewarded-ad.component.html',
})
export class DisplayRewardedAdComponent {
  constructor(private dfp: DfpService) {}
  /**
   * Displays the rewarded ad. This method should not be called
   * until the user has consented to view the ad.
   */
  displayRewardedAd() {
    this.dfp
      .rewarded({
        unitPath: '/22639388115/rewarded_web_example',
      })
      .subscribe((event) => {
        if (event instanceof RewardedSlotGrantedEvent) {
          alert('The rewarded is granted');
        } else if (event instanceof RewardedSlotClosedEvent) {
          alert('The rewarded is closed');
        } else {
          alert('The rewarded is empty');
        }
        googletag.destroySlots([event.slot]);
      });
  }
}
