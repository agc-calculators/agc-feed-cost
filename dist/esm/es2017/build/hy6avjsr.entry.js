/*! Built with http://stenciljs.com */
import { h } from '../agc-feed-cost.core.js';

const validate = (form, name) => {
    let el = form.querySelector(`[name="${name}"]`);
    let message = form.querySelector(`[data-validates="${name}"`);
    if (!el.checkValidity()) {
        if (el.className.indexOf('invalid') === -1) {
            el.className += " invalid";
        }
        message.style.display = 'block';
        return false;
    }
    else {
        el.className = el.className.replace(" invalid", "");
        message.style.display = 'none';
    }
    return true;
};
const round = (num, places) => {
    return +(Math.round(new Number(`${num}e+${places}`).valueOf()) + "e-" + places);
};

class AgcFeedCost {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.units = { weight: 'lbs' };
        this.mode = 'step';
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-feed-cost", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.start-weight" }, "Starting Weight"),
                        h("input", { name: "startWeight", type: "number", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.start-weight.required", "data-validates": "startWeight" }, "Please enter a value."),
                        h("p", { "data-i18n": `hints.start-weight-${this.units.weight}` }, "\u2BA4 Enter a starting weight in pounds.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.end-weight" }, "Ending Weight"),
                        h("input", { name: "endWeight", type: "number", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.end-weight.required", "data-validates": "endWeight" }, "Please enter a value."),
                        h("p", { "data-i18n": `hints.end-weight-${this.units.weight}` }, "\u2BA4 Enter an ending weight in pounds.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next")])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.days-on-feed" }, "Days on Feed"),
                        h("input", { name: "daysOnFeed", type: "number", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.days-on-feed.required", "data-validates": "daysOnFeed" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.days-on-feed" }, "\u2BA4 Enter the number of days on feed.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next")])),
                h("section", { "data-wizard-section": "4" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.feed-cost-per-pound" }, "Feed Cost per Pound"),
                        h("input", { name: "feedCostPerPound", type: "number", required: true, step: "0.01" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.feed-cost-per-pound.required", "data-validates": "feedCostPerPound" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.feed-cost-per-pound" }, "\u2BA4 Enter the cost of one pound of feed.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3) }, "Calculate"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'startWeight')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'endWeight')) {
                valid = false;
            }
        }
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'daysOnFeed')) {
                valid = false;
            }
        }
        if (this.currentStep === 3 || this.mode === 'full') {
            if (!validate(this.form, 'feedCostPerPound')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache['sections'].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let startWeight = parseFloat(this.form.querySelector('[name="startWeight"').value);
        let endWeight = parseFloat(this.form.querySelector('[name="endWeight"').value);
        let daysOnFeed = parseInt(this.form.querySelector('[name="daysOnFeed"').value);
        let feedCostPerPound = parseFloat(this.form.querySelector('[name="feedCostPerPound"').value);
        let totalWeightGain = round(endWeight - startWeight, 0);
        let averageDailyGain = round(totalWeightGain / daysOnFeed, 1);
        let totalFeedCost = round((averageDailyGain * feedCostPerPound) * daysOnFeed, 2);
        let feedCostPerDay = round(averageDailyGain * feedCostPerPound, 2);
        let results = {
            socket: this.socket,
            tract: this.tract,
            units: this.units,
            startWeight,
            endWeight,
            daysOnFeed,
            totalFeedCost,
            totalWeightGain,
            averageDailyGain,
            feedCostPerPound,
            feedCostPerDay
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-feed-cost"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}

export { AgcFeedCost };
