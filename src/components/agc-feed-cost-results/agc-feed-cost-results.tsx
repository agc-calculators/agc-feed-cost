
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-feed-cost-results'
})
export class AgcFeedCostResults {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false
    section: HTMLElement;

    render() {
        return (
            <section data-wizard-results ref={c => this.section = c as HTMLElement}>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                        <li>
                            <h2 data-i18n="results.feed-cost-per-day">Feed Cost per Day</h2>
                            <span class="agc-results__value agc-results__unit-value">${parseFloat(this.data['feedCostPerDay']).toFixed}</span>
                        </li>
                        <li>
                            <h2 data-i18n="results.total-feed-cost">Total Feed Cost</h2>
                            <span class="agc-results__value agc-results__unit-value">${parseFloat(this.data['totalFeedCost']).toFixed(2)}</span>
                        </li>
                        <li>
                            <h2 data-i18n="results.average-daily-gain">Average Daily Gain</h2>
                            <span class="agc-results__value agc-results__unit-value" data-unit={this.data['units']['weight']}>{this.data['averageDailyGain']}</span>
                            <sub>{this.data['units']['weight']}</sub>
                        </li>                        
                    </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
        this.ready = true;
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
}
