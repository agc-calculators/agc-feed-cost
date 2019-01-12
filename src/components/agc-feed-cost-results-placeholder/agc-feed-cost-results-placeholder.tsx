
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-feed-cost-results-placeholder'
})
export class AgcFeedCostResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.feed-cost-per-day">Feed Cost per Day</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.feed-cost-per-pound">Feed Cost per Pound</h2>
                        {placeholder()}
                    </li>                                      
                </ul>
            </section>
        );
    }
}