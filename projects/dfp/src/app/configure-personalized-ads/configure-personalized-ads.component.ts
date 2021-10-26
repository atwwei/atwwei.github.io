import { Component, OnDestroy } from '@angular/core';
import { DfpService } from '@wwei/dfp';

import { Option } from '../types';

@Component({
  selector: 'app-configure-personalized-ads',
  templateUrl: './configure-personalized-ads.component.html',
})
export class ConfigurePersonalizedAdsComponent implements OnDestroy {
  options: Option<number>[] = [
    {
      value: 0,
      checked: false,
      label: '0 for personalized ads',
    },
    {
      value: 1,
      checked: true,
      label: '1 for non-personalized ads',
    },
  ];

  constructor(private dfp: DfpService) {
    this.setOptions();
  }

  setOptions(): void {
    this.dfp.cmd(() => {
      // Personalized ad serving is enabled by default. Set "request non-personalized ads" to 1 to disable.
      googletag.pubads().setRequestNonPersonalizedAds(1);
    });
  }

  check(option: Option<number>): void {
    const last = this.options.find((opt) => opt.checked);
    if (last) {
      last.checked = false;
    }
    option.checked = true;
    googletag.pubads().setRequestNonPersonalizedAds(option.value);
    googletag.pubads().refresh();
  }

  ngOnDestroy(): void {
    this.dfp.cmd(() => {
      googletag.pubads().setRequestNonPersonalizedAds(0);
    });
  }
}
