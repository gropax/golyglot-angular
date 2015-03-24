angular.module('golyglot.eng').service('eng', eng);

function eng(std) {

    this.equivalentTemplateUrl = "eng/equivalent.html";
    // this.lemmaTemplateUrl
    this.sentenceTemplateUrl = "eng/sentence.html";

    this.getEnglish = std.representation("script", "Latn");

}
