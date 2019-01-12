
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate, round } from '../../utils';

// import { addDays, formatDate, inputDate, daysBetween } from '../../utils'

@Component({
    tag: 'agc-feed-cost'
})
export class AgcFeedCost {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() units: any = { weight: 'lbs' }
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-feed-cost" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.start-weight">Starting Weight</label>
                            <input name="startWeight" type="number" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.start-weight.required" data-validates="startWeight">Please enter a value.</p>
                            <p data-i18n={`hints.start-weight-${this.units.weight}`}>⮤ Enter a starting weight in pounds.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.end-weight">Ending Weight</label>
                            <input name="endWeight" type="number" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.end-weight.required" data-validates="endWeight">Please enter a value.</p>
                            <p data-i18n={`hints.end-weight-${this.units.weight}`}>⮤ Enter an ending weight in pounds.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.days-on-feed">Days on Feed</label>
                            <input name="daysOnFeed" type="number" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.days-on-feed.required" data-validates="daysOnFeed">Please enter a value.</p>
                            <p data-i18n="hints.days-on-feed">⮤ Enter the number of days on feed.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="4">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.feed-cost-per-pound">Feed Cost per Pound</label>
                            <input name="feedCostPerPound" type="number" required step="0.01" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.feed-cost-per-pound.required" data-validates="feedCostPerPound">Please enter a value.</p>
                            <p data-i18n="hints.feed-cost-per-pound">⮤ Enter the cost of one pound of feed.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'startWeight')) {
                valid = false
            }
        }
        
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'endWeight')) {
                valid = false
            }
        }

        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'daysOnFeed')) {
                valid = false
            }
        }

        if (this.currentStep === 3 || this.mode === 'full') {
            if (!validate(this.form, 'feedCostPerPound')) {
                valid = false
            }
        }

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let startWeight =  parseFloat((this.form.querySelector('[name="startWeight"') as HTMLInputElement).value);        
        let endWeight =  parseFloat((this.form.querySelector('[name="endWeight"') as HTMLInputElement).value);
        let daysOnFeed =  parseInt((this.form.querySelector('[name="daysOnFeed"') as HTMLInputElement).value);
        let feedCostPerPound =  parseFloat((this.form.querySelector('[name="feedCostPerPound"') as HTMLInputElement).value);

        let totalWeightGain = round(endWeight - startWeight, 0)
        let averageDailyGain = round(totalWeightGain / daysOnFeed, 1)
        let totalFeedCost = round((averageDailyGain * feedCostPerPound) * daysOnFeed, 2)
        let feedCostPerDay = round(averageDailyGain * feedCostPerPound, 2)

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
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        //(this.form.querySelector('[name="first"]') as HTMLInputElement)!.defaultValue = 'Yup';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}