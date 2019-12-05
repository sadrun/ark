"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apps = [];
var prefixAppUnMount = null;
function registerApplication(name, loadAppFun, preLoad, isActive) {
    apps.push({
        name: name,
        loadAppFun: loadAppFun,
        preLoad: preLoad,
        isActive: isActive,
    });
}
exports.registerApplication = registerApplication;
function getActivityApp(location) {
    if (location === void 0) { location = window.location; }
    for (var i = 0; i < apps.length; i++) {
        if (apps[i].isActive(location)) {
            return apps[i];
        }
    }
    return null;
}
function loadApp() {
    prefixAppUnMount && prefixAppUnMount(); // 卸载
    var activeApp = getActivityApp();
    if (activeApp) {
        activeApp.loadAppFun().then(function (_a) {
            var willMount = _a.willMount, mount = _a.mount, unMount = _a.unMount;
            if (typeof willMount === 'function') {
                willMount();
            }
            if (typeof mount === 'function') {
                mount();
            }
            prefixAppUnMount = unMount;
        });
    }
    else {
        console.log('microApps未匹配到对应应用');
    }
}
function initRouter(config) {
    if (config === void 0) { config = {}; }
    window.addEventListener('popstate', function (event) {
        console.log('popstate event', event);
        if (event.state && event.state.type === 'microApps') {
            loadApp();
        }
    });
    if (getActivityApp()) {
        loadApp();
    }
    else if (config.index) {
        goto('', config.index);
    }
}
exports.initRouter = initRouter;
function goto(title, href) {
    window.history.pushState({ type: 'microApps' }, title, href);
    loadApp();
}
exports.goto = goto;
function preLoadApp() {
    for (var i = 0; i < apps.length; i++) {
        // @ts-ignore
        !!apps[i].preLoad && apps[i].preLoad();
    }
}
exports.preLoadApp = preLoadApp;
