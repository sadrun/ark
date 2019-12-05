import { __awaiter, __generator } from "tslib";
import { importEntry } from 'import-html-entry';
import { registerApplication, initRouter, goto as _goto, preLoadApp, } from './application';
import { recordCurAppGlobalVariable, clearAllEffect, proxyEventListener, setTitle } from './utils';
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
export var goto = _goto;
export function registerMicroApps(apps, config) {
    var _this = this;
    apps.forEach(function (app) { return __awaiter(_this, void 0, void 0, function () {
        var name, entry, render, activeRule, isPreload;
        var _this = this;
        return __generator(this, function (_a) {
            name = app.name, entry = app.entry, render = app.render, activeRule = app.activeRule, isPreload = app.isPreload;
            registerApplication(name, function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, template, execScripts, _b, willMount, mount, unMount;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, importEntry(entry)];
                        case 1:
                            _a = _c.sent(), template = _a.template, execScripts = _a.execScripts;
                            render({ template: template, loading: true, name: name });
                            setTitle(template);
                            clearAllEffect();
                            recordCurAppGlobalVariable();
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
            }); }, !!isPreload ? function () { return __awaiter(_this, void 0, void 0, function () {
                var getExternalScripts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, importEntry(entry)];
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
    preLoadApp();
    initRouter(config);
    proxyEventListener();
}
