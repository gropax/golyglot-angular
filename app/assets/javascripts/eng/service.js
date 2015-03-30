angular.module('golyglot.eng').service('eng', eng);

function eng(std) {
    this.getEnglish = std.representation("script", "Latn");
}
