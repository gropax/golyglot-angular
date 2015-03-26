angular.module('golyglot.core').service('lang', lang);

// @todo To be removed.
//
function lang(std, cmn, eng) {
    this.std = std;
    this.eng = eng;
    this.cmn = cmn;
}
