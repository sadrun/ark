"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var import_html_entry_1 = require("import-html-entry");
var application_1 = require("./application");
var utils_1 = require("./utils");
function getActiveRule(routerPrefix) {
    return function (location) {
        if (typeof routerPrefix === 'string') {
            return location.pathname.startsWith(routerPrefix);
        }
        if (typeof routerPrefix === 'object' && routerPrefix.test) {
            return routerPrefix.test(location.pathname);
        }
        if (typeof routerPrefix === 'function') {
            return routerPrefix(location);
        }
    };
}
exports.goto = application_1.goto;
function registerMicroApps(apps, config) {
    var _this = this;
    apps.forEach(function (app) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var name, entry, render, activeRule, isPreload;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            name = app.name, entry = app.entry, render = app.render, activeRule = app.activeRule, isPreload = app.isPreload;
            application_1.registerApplication(name, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, template, execScripts, _b, willMount, mount, unMount;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, import_html_entry_1.importEntry(entry)];
                        case 1:
                            _a = _c.sent(), template = _a.template, execScripts = _a.execScripts;
                            render({ template: template, loading: true, name: name });
                            utils_1.setTitle(template);
                            utils_1.clearAllEffect();
                            utils_1.recordCurAppGlobalVariable();
                            return [4 /*yield*/, execScripts()];
                        case 2:
                            _b = _c.sent(), willMount = _b.willMount, mount = _b.mount, unMount = _b.unMount;
                            return [2 /*return*/, {
                                    willMount: willMount,
                                    mount: function () {
                                        mount && mount();
                                        render({ template: template, loading: false, name: name });
                                    },
                                    unMount: unMount
                                }];
                    }
                });
            }); }, !!isPreload ? function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var getExternalScripts;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, import_html_entry_1.importEntry(entry)];
                        case 1:
                            getExternalScripts = (_a.sent()).getExternalScripts;
                            return [4 /*yield*/, getExternalScripts()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); } : null, getActiveRule(activeRule));
            return [2 /*return*/];
        });
    }); });
    application_1.preLoadApp();
    application_1.initRouter(config);
    utils_1.proxyEventListener();
}
exports.registerMicroApps = registerMicroApps;
