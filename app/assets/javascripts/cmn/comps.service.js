angular.module('golyglot.cmn').service('cmnComps', cmnComps);


// Access to chinese component templates.
//
function cmnComps(std) {
    // this.equivalentTemplateUrl
    this.lemmaTemplateUrl = "cmn/lemma.html";
    this.sentenceTemplateUrl = "cmn/sentence.html";
    this.configTemplateUrl = "cmn/config.html";
}
