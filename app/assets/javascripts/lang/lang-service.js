angular.module('golyglot.lang').service('lang', lang);

function lang(std, cmn, eng) {
    this.std = std;
    this.eng = eng;
    this.cmn = cmn;
}
