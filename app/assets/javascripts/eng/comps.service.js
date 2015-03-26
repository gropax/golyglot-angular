angular.module('golyglot.eng').service('engComps', engComps);


function engComps(std) {
    this.equivalentTemplateUrl = "eng/components/equivalent.html";
    // this.lemmaTemplateUrl
    this.sentenceTemplateUrl = "eng/components/sentence.html";
}
