export class AgcFeedCostInputs {
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
                    h("h2", { "data-i18n": "results.start-weight" }, "Starting Weight"),
                    h("span", { class: "agc-results__value agc-results__unit-value", "data-unit": this.data['units']['weight'] }, parseFloat(this.data['startWeight']).toFixed),
                    h("sub", null, this.data['units']['weight'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.end-weight" }, "Ending Weight"),
                    h("span", { class: "agc-results__value agc-results__unit-value", "data-unit": this.data['units']['weight'] }, parseFloat(this.data['endWeight']).toFixed(2)),
                    h("sub", null, this.data['units']['weight'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.days-on-feed" }, "Days on Feed"),
                    h("span", { class: "agc-results__value agc-results__unit-value" }, this.data['daysOnFeed']),
                    h("sub", null, "days")),
                h("li", null,
                    h("h2", { "data-i18n": "results.feed-cost-per-pound" }, "Feed Cost per Pound"),
                    h("span", { class: "agc-results__value agc-results__unit-value" },
                        "$",
                        this.data['feedCostPerPound'])))))));
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
    static get is() { return "agc-feed-cost-inputs"; }
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
