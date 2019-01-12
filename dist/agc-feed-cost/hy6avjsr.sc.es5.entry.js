/*! Built with http://stenciljs.com */
AgcFeedCost.loadBundle("hy6avjsr",["exports"],function(t){var e=window.AgcFeedCost.h,a=function(t,e){var a=t.querySelector('[name="'+e+'"]'),i=t.querySelector('[data-validates="'+e+'"');return a.checkValidity()?(a.className=a.className.replace(" invalid",""),i.style.display="none",!0):(-1===a.className.indexOf("invalid")&&(a.className+=" invalid"),i.style.display="block",!1)},i=function(t,e){return+(Math.round(new Number(t+"e+"+e).valueOf())+"e-"+e)},s=function(){function t(){this.socket="",this.tract="",this.units={weight:"lbs"},this.mode="step",this.currentStep=0,this.cache={},this.submitted=!1,this.results={}}return t.prototype.render=function(){var t=this;return e("div",null,e("form",{onSubmit:function(t){return t.preventDefault()},ref:function(e){return t.form=e},"data-wizard":"agc-feed-cost","data-wizard-mode":this.mode,class:"agc-wizard"},e("slot",null),e("section",{"data-wizard-section":"1"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.start-weight"},"Starting Weight"),e("input",{name:"startWeight",type:"number",required:!0}),e("p",{class:"agc-wizard__validation-message","data-i18n":"validation.start-weight.required","data-validates":"startWeight"},"Please enter a value."),e("p",{"data-i18n":"hints.start-weight-"+this.units.weight},"⮤ Enter a starting weight in pounds.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next"))),e("section",{"data-wizard-section":"2"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.end-weight"},"Ending Weight"),e("input",{name:"endWeight",type:"number",required:!0}),e("p",{class:"agc-wizard__validation-message","data-i18n":"validation.end-weight.required","data-validates":"endWeight"},"Please enter a value."),e("p",{"data-i18n":"hints.end-weight-"+this.units.weight},"⮤ Enter an ending weight in pounds.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&[e("button",{class:"agc-wizard__actions-prev","data-i18n":"actions.prev",onClick:this.nextPrev.bind(this,-1)},"Back"),e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next")])),e("section",{"data-wizard-section":"3"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.days-on-feed"},"Days on Feed"),e("input",{name:"daysOnFeed",type:"number",required:!0}),e("p",{class:"agc-wizard__validation-message","data-i18n":"validation.days-on-feed.required","data-validates":"daysOnFeed"},"Please enter a value."),e("p",{"data-i18n":"hints.days-on-feed"},"⮤ Enter the number of days on feed.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&[e("button",{class:"agc-wizard__actions-prev","data-i18n":"actions.prev",onClick:this.nextPrev.bind(this,-1)},"Back"),e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next")])),e("section",{"data-wizard-section":"4"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.feed-cost-per-pound"},"Feed Cost per Pound"),e("input",{name:"feedCostPerPound",type:"number",required:!0,step:"0.01"}),e("p",{class:"agc-wizard__validation-message","data-i18n":"validation.feed-cost-per-pound.required","data-validates":"feedCostPerPound"},"Please enter a value."),e("p",{"data-i18n":"hints.feed-cost-per-pound"},"⮤ Enter the cost of one pound of feed.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&e("button",{class:"agc-wizard__actions-prev","data-i18n":"actions.prev",onClick:this.nextPrev.bind(this,-1)},"Back"),e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.finish",onClick:this.nextPrev.bind(this,"step"===this.mode?1:3)},"Calculate"))),e("section",{"data-wizard-results":!0},e("slot",{name:"results"}))))},t.prototype.showTab=function(t){"step"===this.mode&&(this.cache.sections[t].style.display="block"),this.socket&&this.agcStepChanged.emit({socket:this.socket,tract:this.tract,step:this.currentStep})},t.prototype.reset=function(){this.currentStep=0,this.submitted=!1,this.showTab(0)},t.prototype.validateForm=function(){var t=!0;return 0!==this.currentStep&&"full"!==this.mode||a(this.form,"startWeight")||(t=!1),1!==this.currentStep&&"full"!==this.mode||a(this.form,"endWeight")||(t=!1),2!==this.currentStep&&"full"!==this.mode||a(this.form,"daysOnFeed")||(t=!1),3!==this.currentStep&&"full"!==this.mode||a(this.form,"feedCostPerPound")||(t=!1),t},t.prototype.nextPrev=function(t,e){if(e&&e.preventDefault(),"full"===this.mode){if(!this.validateForm())return!1}else if(1==t&&!this.validateForm())return!1;if("step"===this.mode&&(this.cache.sections[this.currentStep].style.display="none"),this.currentStep=this.currentStep+t,this.currentStep>=this.cache.sections.length)return this.submitted=!0,this.showResults.call(this),!1;this.showTab.call(this,this.currentStep)},t.prototype.showResults=function(){var t=parseFloat(this.form.querySelector('[name="startWeight"').value),e=parseFloat(this.form.querySelector('[name="endWeight"').value),a=parseInt(this.form.querySelector('[name="daysOnFeed"').value),s=parseFloat(this.form.querySelector('[name="feedCostPerPound"').value),n=i(e-t,0),r=i(n/a,1),o=i(r*s*a,2),d=i(r*s,2),c={socket:this.socket,tract:this.tract,units:this.units,startWeight:t,endWeight:e,daysOnFeed:a,totalFeedCost:o,totalWeightGain:n,averageDailyGain:r,feedCostPerPound:s,feedCostPerDay:d};this.socket&&this.agcCalculated.emit({socket:this.socket,tract:this.tract,results:Object.assign({},c)}),this.results=Object.assign({},c),this.cache.results.forEach(function(t){t.style.display="block"})},t.prototype.handleAction=function(t){"reset"===t.detail.action&&this.reset()},t.prototype.componentDidLoad=function(){var t=Array.from(this.form.querySelectorAll("[data-wizard-section]")).map(function(t){return t}).map(function(t){return t}),e=Array.from(this.form.querySelectorAll("[data-wizard-results]")).map(function(t){return t}).map(function(t){return t});this.cache=Object.assign({},this.cache,{sections:t,results:e}),window.document.addEventListener("agcAction",this.handleAction.bind(this)),this.showTab(0)},t.prototype.componentDidUnload=function(){window.document.removeEventListener("agcAction",this.handleAction)},Object.defineProperty(t,"is",{get:function(){return"agc-feed-cost"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{cache:{state:!0},currentStep:{state:!0},mode:{type:String,attr:"mode"},results:{state:!0},socket:{type:String,attr:"socket"},submitted:{state:!0},tract:{type:String,attr:"tract"},units:{type:"Any",attr:"units"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"agcCalculated",method:"agcCalculated",bubbles:!0,cancelable:!0,composed:!0},{name:"agcStepChanged",method:"agcStepChanged",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),t}();t.AgcFeedCost=s,Object.defineProperty(t,"__esModule",{value:!0})});