import { Component, OnDestroy } from '@angular/core';
import { DfpService } from '@wwei/dfp';

import { Option } from '../types';

@Component({
  selector: 'app-configure-privacy',
  templateUrl: './configure-privacy.component.html',
})
export class ConfigurePrivacyComponent implements OnDestroy {
  options: Option[] = [
    {
      value: 'childDirectedTreatment',
      label:
        'childDirectedTreatment configuration indicates whether the page should be treated as child-directed. Set to null to clear the configuration.',
    },
    {
      value: 'limitedAds',
      label:
        'limitedAds configuration enables serving to run in limited ads mode to aid in publisher regulatory compliance needs. When enabled, the GPT library itself may optionally be requested from a cookie-less, limited ads URL.',
    },
    {
      value: 'restrictDataProcessing',
      label:
        'restrictDataProcessing configuration enables serving to run in restricted processing mode to aid in publisher regulatory compliance needs.',
    },
    {
      value: 'underAgeOfConsent',
      label:
        'underAgeOfConsent configuration indicates whether to mark ad requests as coming from users under the age of consent. Set to null to clear the configuration.',
    },
  ];

  constructor(private dfp: DfpService) {}

  check(option: Option): void {
    option.checked = !option.checked;
    const privacyConfig: Record<string, unknown> = {};
    this.options.forEach((opt) => {
      privacyConfig[opt.value] = opt.checked;
    });
    googletag.pubads().setPrivacySettings(privacyConfig);
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
