angular.module('golyglot.lang.cmn').service('cmnSettings', cmnSettings);

cmnSettings.$inject = [];

function cmnSettings() {
    this.charset = "simplified";
    this.showPinyin = true;
}
