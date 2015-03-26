angular.module('golyglot.cmn').service('cmn', cmn);

// @todo
//     Remove template urls.
//
function cmn(std) {

    // this.equivalentTemplateUrl
    this.lemmaTemplateUrl = "cmn/lemma.html";
    this.sentenceTemplateUrl = "cmn/sentence.html";

    this.getPinyin = std.representation("orthographyName", "pinyin");
    this.getSimplified = std.representation("script", "Hans");
    this.getTraditional = std.representation("script", "Hant");

}
