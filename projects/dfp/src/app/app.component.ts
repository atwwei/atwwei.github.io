import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { DfpService, SlotRenderEndedEvent } from '@wwei/dfp';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SAMPLES } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'dfp-samples';

  isSRA = false;

  samples = SAMPLES;

  current = SAMPLES[0];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private dfp: DfpService,
    router: Router,
    updates: SwUpdate,
  ) {
    updates.available.subscribe(() => {
      updates.activateUpdate().then(() => document.location.reload());
    });

    const navigationEnd = router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ) as Observable<NavigationEnd>;
    navigationEnd.subscribe((event) => {
      const url = event.url.split('/');
      const current = this.samples.find((sample) => {
        const path = sample.path?.split('/') || '';
        return url[1] === path[0];
      });
      this.current = current ? current : this.current;
    });

    if (isPlatformBrowser(platformId)) {
      this.isSRA = (sessionStorage?.getItem('isSRA') || 'true') === 'true';
    }

    this.dfp.cmd(() => {
      if (this.isSRA) {
        googletag.pubads().enableSingleRequest();
      }
    });

    dfp.events
      .pipe(filter((event) => event instanceof SlotRenderEndedEvent))
      .subscribe((event) => {
        if (this.current.path !== 'ad-event-listeners') {
          console.log(event);
        }
      });
  }

  enableSingleRequest() {
    sessionStorage?.setItem('isSRA', this.isSRA ? 'false' : 'true');
    document.location.reload();
  }
}
