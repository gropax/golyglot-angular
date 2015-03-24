angular.module('golyglot.eng').service('eng', eng);

function eng(std) {

    this.equivalentTemplateUrl = "eng/equivalent.html";
    // this.lemmaTemplateUrl

    this.getEnglish = std.representation("script", "Latn");

}
