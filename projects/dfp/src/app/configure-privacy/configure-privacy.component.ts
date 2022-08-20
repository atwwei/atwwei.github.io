import { Component, OnDestroy } from '@angular/core';
import { DfpService } from '@wwei/dfp';

import { Option } from '../types';

@Component({
  selector: 'app-configure-privacy',
  templateUrl: './configure-privacy.component.html',
})
export class ConfigurePrivacyComponent implements OnDestroy {
  options: Option<keyof googletag.PrivacySettingsConfig>[] = [
    {
      value: 'childDirectedTreatment',
      label: 'Indicates whether the page should be treated as child-directed.',
    },
    {
      value: 'limitedAds',
      label:
        'Enables serving to run in limited ads mode to aid in publisher regulatory compliance needs.',
    },
    {
      value: 'nonPersonalizedAds',
      label:
        'Enables serving to run in non-personalized ads mode to aid in publisher regulatory compliance needs.',
    },
    {
      value: 'restrictDataProcessing',
      label:
        'Enables serving to run in restricted processing mode to aid in publisher regulatory compliance needs.',
    },
    {
      value: 'trafficSource',
      label:
        'Indicates whether requests represent purchased or organic traffic.',
    },
    {
      value: 'underAgeOfConsent',
      label:
        'Indicates whether to mark ad requests as coming from users under the age of consent.',
    },
  ];

  constructor(private dfp: DfpService) {}

  check(option: Option): void {
    option.checked = !option.checked;
    googletag
      .pubads()
      .setPrivacySettings(
        this.options.reduce((p, c) => ((p[c.value] = c.checked), p), {} as any),
      );
    googletag.pubads().refresh();
  }

  ngOnDestroy(): void {
    this.dfp.cmd(() => {
      googletag.pubads().setPrivacySettings({
        childDirectedTreatment: null,
        limitedAds: false,
        restrictDataProcessing: false,
        underAgeOfConsent: null,
      });
    });
  }
}
