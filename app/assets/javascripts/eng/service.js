angular.module('golyglot.eng').service('eng', eng);

function eng(std) {

    this.english = std.representation("script", "Latn");

}
