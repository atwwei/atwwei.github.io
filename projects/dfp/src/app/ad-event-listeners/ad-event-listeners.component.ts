import { ChangeDetectorRef, Component } from '@angular/core';
import {
  ImpressionViewableEvent,
  DfpService,
  SlotOnloadEvent,
  SlotRenderEndedEvent,
  SlotRequestedEvent,
  SlotResponseReceived,
  SlotVisibilityChangedEvent,
} from '@wwei/dfp';
import { filter, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-ad-event-listeners',
  templateUrl: './ad-event-listeners.component.html',
})
export class AdEventListenersComponent extends BaseComponent {
  slotIds = ['ad-slot-1', 'ad-slot-2'];
  eventsStatus: [string, string, string[]][] = [];

  constructor(private change: ChangeDetectorRef, private dfp: DfpService) {
    super();
    this.addEventListeners();
  }

  onSlotRenderEndedEvent(event: SlotRenderEndedEvent) {
    this.pushStatus(
      event.slot.getSlotElementId(),
      'SlotRenderEnded【EventEmitter】',
    );
  }

  onSlotVisibilityChanged(event: SlotVisibilityChangedEvent) {
    this.pushStatus(
      event.slot.getSlotElementId(),
      'SlotVisibilityChanged【EventEmitter】',
    );
  }

  addEventListeners(): void {
    this.eventsStatus = [];
    this.dfp.events
      .pipe(
        filter((event) => {
          return this.slotIds.indexOf(event.slot.getSlotElementId()) !== -1;
        }),
        takeUntil(this.destory),
      )
      .subscribe((event) => {
        let eventType = '';
        let details: string[] = [];
        if (event instanceof ImpressionViewableEvent) {
          eventType = 'ImpressionViewable';
        } else if (event instanceof SlotOnloadEvent) {
          eventType = 'SlotOnload';
        } else if (event instanceof SlotRenderEndedEvent) {
          eventType = 'SlotRenderEnded';
          details = [
            'Is empty?: ' + event.isEmpty,
            'Advertiser ID: ' + event.advertiserId,
            'Campaign ID: ' + event.campaignId,
            'Creative ID: ' + event.creativeId,
            'Line Item ID: ' + event.lineItemId,
            'Size: ' + event.size,
            'Source Agnostic Creative ID: ' + event.sourceAgnosticCreativeId,
            'Source Agnostic Line Item ID: ' + event.sourceAgnosticLineItemId,
          ];
          if (event.isEmpty) {
            details.splice(1);
          }
        } else if (event instanceof SlotRequestedEvent) {
          eventType = 'SlotRequested';
        } else if (event instanceof SlotResponseReceived) {
          eventType = 'SlotResponseReceived';
        } else if (event instanceof SlotVisibilityChangedEvent) {
          eventType = 'SlotVisibilityChanged';
          details = ['Visible area: ' + event.inViewPercentage + '%'];
        }
        this.pushStatus(event.slot.getSlotElementId(), eventType, details);
      });
  }

  pushStatus(elementId: string, eventType: string, details: string[] = []) {
    this.eventsStatus.push([elementId, eventType, details]);
    this.change.detectChanges();
  }
}
