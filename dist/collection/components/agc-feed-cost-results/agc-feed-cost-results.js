export class AgcFeedCostResults {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.feed-cost-per-day" }, "Feed Cost per Day"),
                    h("span", { class: "agc-results__value agc-results__unit-value" },
                        "$",
                        parseFloat(this.data['feedCostPerDay']).toFixed)),
                h("li", null,
                    h("h2", { "data-i18n": "results.total-feed-cost" }, "Total Feed Cost"),
                    h("span", { class: "agc-results__value agc-results__unit-value" },
                        "$",
                        parseFloat(this.data['totalFeedCost']).toFixed(2))),
                h("li", null,
                    h("h2", { "data-i18n": "results.average-daily-gain" }, "Average Daily Gain"),
                    h("span", { class: "agc-results__value agc-results__unit-value", "data-unit": this.data['units']['weight'] }, this.data['averageDailyGain']),
                    h("sub", null, this.data['units']['weight'])))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-feed-cost-results"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}
