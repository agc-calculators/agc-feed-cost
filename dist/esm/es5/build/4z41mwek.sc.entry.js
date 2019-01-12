/*! Built with http://stenciljs.com */
import{h}from"../agc-feed-cost.core.js";var AgcFeedCostProgress=function(){function e(){this.socket="",this.currentStep=-1}return e.prototype.render=function(){var e=this;return h("div",{ref:function(t){return e.progress=t},class:"wizard__progress"},h("span",{class:"step"+(this.currentStep>0?" finish":"")+(0===this.currentStep?" active":"")}),h("span",{class:"step"+(this.currentStep>1?" finish":"")+(1===this.currentStep?" active":"")}),h("span",{class:"step"+(this.currentStep>2?" finish":"")+(2===this.currentStep?" active":"")}),h("span",{class:"step"+(this.currentStep>3?" finish":"")+(3===this.currentStep?" active":"")}))},e.prototype.componentDidLoad=function(){window.document.addEventListener("agcStepChanged",this.agcStepChangedHandler.bind(this)),window.document.addEventListener("agcCalculated",this.agcCalculatedHandler.bind(this))},e.prototype.agcStepChangedHandler=function(e){e.detail.socket===this.socket&&(this.currentStep=parseInt(e.detail.step),this.progress.classList.remove("complete"))},e.prototype.agcCalculatedHandler=function(e){e.detail.socket===this.socket&&(this.currentStep=2,this.progress.classList.add("complete"))},e.prototype.componentDidUnload=function(){window.document.removeEventListener("agcCalculated",this.agcCalculatedHandler),window.document.removeEventListener("agcStepChanged",this.agcStepChangedHandler)},Object.defineProperty(e,"is",{get:function(){return"agc-feed-cost-progress"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{currentStep:{state:!0},socket:{type:String,attr:"socket"}}},enumerable:!0,configurable:!0}),e}();export{AgcFeedCostProgress};