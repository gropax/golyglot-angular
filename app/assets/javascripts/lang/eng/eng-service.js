angular.module('golyglot.lang.eng').service('eng', eng);

function eng(std) {

    this.english = std.representation("script", "Latn");

}
