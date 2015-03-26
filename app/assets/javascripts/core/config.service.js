angular.module('golyglot.core').service('config', config);

// @todo To be removed in favor of `AppCtrl`.
//
function config() {
    this.secondLanguage = "eng";
}
