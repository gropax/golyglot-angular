angular.module('golyglot.cmn').service('cmn', cmn);

function cmn(std) {

    // this.equivalentTemplateUrl
    this.lemmaTemplateUrl = "cmn/lemma.html";

    this.getPinyin = std.representation("orthographyName", "pinyin");
    this.getSimplified = std.representation("script", "Hans");
    this.getTraditional = std.representation("script", "Hant");

}
