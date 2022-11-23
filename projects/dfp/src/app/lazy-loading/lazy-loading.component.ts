import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { DfpService, SlotOnloadEvent, SlotRequestedEvent } from '@wwei/dfp';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
})
export class LazyLoadingComponent extends BaseComponent implements OnDestroy {
  status: Record<string, { fetched: boolean; rendered: boolean }> = {};

  constructor(private change: ChangeDetectorRef, private dfp: DfpService) {
    super();
    this.setOptions();
    this.addEventListeners();
  }

  setOptions(): void {
    this.dfp.cmd(() => {
      // A) Enable with defaults.
      googletag.pubads().enableLazyLoad();
      // B) Enable without lazy fetching. Additional calls override previous
      // ones.
      googletag.pubads().enableLazyLoad({ fetchMarginPercent: -1 });
      // C) Enable lazy loading with...
      googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 500,
        renderMarginPercent: 200,
        mobileScaling: 2.0,
      });
    });
  }

  addEventListeners(): void {
    this.dfp.events.pipe(takeUntil(this.destory)).subscribe((event) => {
      const slotId = event.slot.getSlotElementId();
      this.status[slotId] = this.status[slotId] || {};
      if (event instanceof SlotRequestedEvent) {
        this.status[slotId].fetched = true;
      } else if (event instanceof SlotOnloadEvent) {
        this.status[slotId].rendered = true;
      }
      this.change.detectChanges();
    });
  }

  override ngOnDestroy(): void {
    this.dfp.cmd(() => {
      googletag.pubads().enableLazyLoad();
    });
  }
}
