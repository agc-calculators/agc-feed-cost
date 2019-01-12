/*! Built with http://stenciljs.com */
const{h:t}=window.AgcFeedCost;class e{constructor(){this.socket="",this.currentStep=-1}render(){return t("div",{ref:t=>this.progress=t,class:"wizard__progress"},t("span",{class:`step${this.currentStep>0?" finish":""}${0===this.currentStep?" active":""}`}),t("span",{class:`step${this.currentStep>1?" finish":""}${1===this.currentStep?" active":""}`}),t("span",{class:`step${this.currentStep>2?" finish":""}${2===this.currentStep?" active":""}`}),t("span",{class:`step${this.currentStep>3?" finish":""}${3===this.currentStep?" active":""}`}))}componentDidLoad(){window.document.addEventListener("agcStepChanged",this.agcStepChangedHandler.bind(this)),window.document.addEventListener("agcCalculated",this.agcCalculatedHandler.bind(this))}agcStepChangedHandler(t){t.detail.socket===this.socket&&(this.currentStep=parseInt(t.detail.step),this.progress.classList.remove("complete"))}agcCalculatedHandler(t){t.detail.socket===this.socket&&(this.currentStep=2,this.progress.classList.add("complete"))}componentDidUnload(){window.document.removeEventListener("agcCalculated",this.agcCalculatedHandler),window.document.removeEventListener("agcStepChanged",this.agcStepChangedHandler)}static get is(){return"agc-feed-cost-progress"}static get properties(){return{currentStep:{state:!0},socket:{type:String,attr:"socket"}}}}export{e as AgcFeedCostProgress};