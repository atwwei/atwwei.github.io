import { Component, OnDestroy } from '@angular/core';
import { DfpService } from '@wwei/dfp';

import { Option } from '../types';

@Component({
  selector: 'app-configure-cookies',
  templateUrl: './configure-cookies.component.html',
})
export class ConfigureCookiesComponent implements OnDestroy {
  options: Option<number>[] = [
    {
      value: 0,
      checked: false,
      label:
        '0: Enables Google Ad Manager cookies on ad requests on the page. This option is set by default.',
    },
    {
      value: 1,
      checked: true,
      label:
        '1: Ignores Google Ad Manager cookies on subsequent ad requests and prevents cookies from being created on the page. Note that cookies will not be ignored on certain pingbacks and that this option will disable features that rely on cookies, such as dynamic allocation.',
    },
  ];

  constructor(private dfp: DfpService) {
    this.setOptions();
  }

  setOptions(): void {
    this.dfp.cmd(() => {
      // Cookies are enabled by default. Set cookie options to 1 to disable.
      googletag.pubads().setCookieOptions(1);
    });
  }

  check(option: Option<number>): void {
    const last = this.options.find((opt) => opt.checked);
    if (last) {
      last.checked = false;
    }
    option.checked = true;
    googletag.pubads().setCookieOptions(option.value);
    googletag.pubads().refresh();
  }

  ngOnDestroy(): void {
    this.dfp.cmd(() => {
      googletag.pubads().setCookieOptions(0);
    });
  }
}
