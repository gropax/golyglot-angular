angular.module('golyglot.cmn').service('cmnComps', cmnComps);


// Access to chinese component templates.
//
function cmnComps(std) {
    // this.equivalentTemplateUrl
    this.lemmaTemplateUrl = "cmn/components/lemma.html";
    this.sentenceTemplateUrl = "cmn/components/sentence.html";
    this.configTemplateUrl = "cmn/components/config.html";
}
