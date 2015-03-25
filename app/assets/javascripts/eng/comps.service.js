angular.module('golyglot.eng').service('engComps', engComps);


function engComps(std) {
    this.equivalentTemplateUrl = "eng/equivalent.html";
    // this.lemmaTemplateUrl
    this.sentenceTemplateUrl = "eng/sentence.html";
}
