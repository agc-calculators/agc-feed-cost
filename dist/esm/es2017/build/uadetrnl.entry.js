/*! Built with http://stenciljs.com */
import { h } from '../agc-feed-cost.core.js';

class AgcFeedCostResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.feed-cost-per-day" }, "Feed Cost per Day"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.feed-cost-per-pound" }, "Feed Cost per Pound"),
                    placeholder()))));
    }
    static get is() { return "agc-feed-cost-results-placeholder"; }
}

export { AgcFeedCostResultsPlaceholder };
