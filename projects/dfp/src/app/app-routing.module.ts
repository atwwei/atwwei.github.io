import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DfpModule } from '@wwei/dfp';

import { AdEventListenersComponent } from './ad-event-listeners/ad-event-listeners.component';
import { AdSizesComponent } from './ad-sizes/ad-sizes.component';
import { AdsenseAttributesComponent } from './adsense-attributes/adsense-attributes.component';
import { CollapseEmptyAdSlotsComponent } from './collapse-empty-ad-slots/collapse-empty-ad-slots.component';
import { ConfigurePrivacyComponent } from './configure-privacy/configure-privacy.component';
import { DisplayOutOfPageAdComponent } from './display-out-of-page-ad/display-out-of-page-ad.component';
import { DisplayRewardedAdComponent } from './display-rewarded-ad/display-rewarded-ad.component';
import { RefreshComponent } from './refresh/refresh.component';
import { SameComponent } from './same/same.component';

export const SAMPLES: Routes = [
  {
    path: 'ad-sizes',
    component: AdSizesComponent,
    data: {
      name: 'Ad sizes',
      description:
        'Specify which ad sizes are eligible to serve to an ad slot.',
    },
  },
  {
    path: 'adsense-attributes',
    component: AdsenseAttributesComponent,
    data: {
      name: 'AdSense Attributes',
      description:
        'Override the adSense attributes server-side settings on a per-request basis.',
    },
  },
  {
    path: 'configure-privacy',
    component: ConfigurePrivacyComponent,
    data: {
      name: 'Configure privacy settings',
      description: 'Customize privacy settings for GPT ad requests.',
    },
  },
  {
    path: 'display-out-of-page-ad',
    component: DisplayOutOfPageAdComponent,
    data: {
      name: 'Display an out-of-page ad',
      description: 'Display a pop-up, pop-under, or floating ad.',
    },
  },
  {
    path: 'display-rewarded-ad',
    component: DisplayRewardedAdComponent,
    data: {
      name: 'Display Rewarded Ad',
      description: 'Display a GPT-managed rewarded ad.',
    },
  },
  {
    path: 'ad-event-listeners',
    component: AdEventListenersComponent,
    data: {
      name: 'Ad event listeners',
      description: 'Monitor and report on ad events fired by GPT.',
    },
  },
  {
    path: 'collapse-empty-ad-slots',
    component: CollapseEmptyAdSlotsComponent,
    data: {
      name: 'Collapse empty ad slots',
      description:
        'Automatically show/hide ad slots when certain criteria are met.',
    },
  },
  {
    path: 'lazy-loading',
    loadChildren: () =>
      import('./lazy-loading/lazy-loading.module').then(
        (m) => m.LazyLoadingModule,
      ),
    data: {
      name: 'Lazy loading',
      description: 'Defer the requesting and rendering of ads.',
    },
  },
  {
    path: 'refresh',
    component: RefreshComponent,
    data: {
      name: 'Refresh ad slots',
      description: 'Use GPT to dynamically reload ads.',
    },
  },
  {
    path: 'same',
    data: {
      name: 'Same navigation',
      description: 'Refresh ads on same navigation.',
    },
    children: [
      {
        path: ':id',
        component: SameComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '1',
      },
    ],
  },
];

const components = [
  AdSizesComponent,
  AdsenseAttributesComponent,
  ConfigurePrivacyComponent,
  DisplayOutOfPageAdComponent,
  AdEventListenersComponent,
  CollapseEmptyAdSlotsComponent,
  RefreshComponent,
  SameComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    DfpModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: SAMPLES[0].path,
        },
        ...SAMPLES,
      ],
      {
        useHash: true,
        initialNavigation: 'enabledBlocking',
      },
    ),
  ],
  exports: [RouterModule, ...components],
})
export class AppRoutingModule {}
