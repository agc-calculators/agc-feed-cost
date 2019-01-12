/*! Built with http://stenciljs.com */
import{h}from"../agc-feed-cost.core.js";var AgcFeedCostResults=function(){function t(){this.socket="",this.ready=!1}return t.prototype.render=function(){var t=this;return h("section",{"data-wizard-results":!0,ref:function(e){return t.section=e}},h("div",{style:{display:this.ready?"none":"block"}},h("slot",{name:"empty"})),h("div",{style:{display:this.ready?"block":"none"}},this.data&&h("ul",{class:"agc-results"},h("li",null,h("h2",{"data-i18n":"results.feed-cost-per-day"},"Feed Cost per Day"),h("span",{class:"agc-results__value agc-results__unit-value"},"$",parseFloat(this.data.feedCostPerDay).toFixed)),h("li",null,h("h2",{"data-i18n":"results.total-feed-cost"},"Total Feed Cost"),h("span",{class:"agc-results__value agc-results__unit-value"},"$",parseFloat(this.data.totalFeedCost).toFixed(2))),h("li",null,h("h2",{"data-i18n":"results.average-daily-gain"},"Average Daily Gain"),h("span",{class:"agc-results__value agc-results__unit-value","data-unit":this.data.units.weight},this.data.averageDailyGain),h("sub",null,this.data.units.weight)))))},t.prototype.handleResults=function(t){t.detail.socket===this.socket&&(this.data=Object.assign({},t.detail.results),this.ready=!0)},t.prototype.componentDidLoad=function(){this.socket&&window.document.addEventListener("agcCalculated",this.handleResults.bind(this))},t.prototype.componentDidUnload=function(){window.document.removeEventListener("agcCalculated",this.handleResults)},Object.defineProperty(t,"is",{get:function(){return"agc-feed-cost-results"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{state:!0},ready:{state:!0},socket:{type:String,attr:"socket"}}},enumerable:!0,configurable:!0}),t}();export{AgcFeedCostResults};