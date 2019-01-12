
// AgcFeedCost: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-feed-cost.core.js';
import {
  AgcFeedCost,
  AgcFeedCostInputs,
  AgcFeedCostProgress,
  AgcFeedCostResults,
  AgcFeedCostResultsPlaceholder
} from './agc-feed-cost.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcFeedCost,
    AgcFeedCostInputs,
    AgcFeedCostProgress,
    AgcFeedCostResults,
    AgcFeedCostResultsPlaceholder
  ], opts);
}
