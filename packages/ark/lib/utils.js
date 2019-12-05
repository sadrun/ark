"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 全局变量
var lastGlobalVariableIndex;
function recordCurAppGlobalVariable() {
    delete window.webpackJsonp;
    lastGlobalVariableIndex = 0;
    for (var p in window) {
        if (!window.hasOwnProperty(p)) {
            continue;
        }
        lastGlobalVariableIndex += 1;
    }
    return lastGlobalVariableIndex;
}
exports.recordCurAppGlobalVariable = recordCurAppGlobalVariable;
function clearOldAppGlobalVariable() {
    var windowProps = [];
    for (var p in window) {
        if (!window.hasOwnProperty(p)) {
            continue;
        }
        windowProps.push(p);
    }
    if (lastGlobalVariableIndex < windowProps.length) {
        console.log('清除全局变量：', windowProps.slice(lastGlobalVariableIndex));
        windowProps.slice(lastGlobalVariableIndex).map(function (prop) {
            delete window[prop];
        });
    }
}
exports.clearOldAppGlobalVariable = clearOldAppGlobalVariable;
// window事件
var winAddListener = window.addEventListener;
var winRemoveListener = window.removeEventListener;
var curEventListener = [];
function proxyEventListener() {
    window.addEventListener = function (event, handleFunction, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        curEventListener.push({
            event: event,
            handleFunction: handleFunction,
            useCapture: useCapture,
        });
        winAddListener(event, handleFunction, useCapture);
    };
}
exports.proxyEventListener = proxyEventListener;
function clearEventListener() {
    console.log('清除事件：', curEventListener);
    curEventListener.forEach(function (listener) {
        winRemoveListener(listener.event, listener.handleFunction, listener.useCapture);
    });
    curEventListener = [];
}
exports.clearEventListener = clearEventListener;
function clearAllEffect() {
    clearOldAppGlobalVariable();
    clearEventListener();
}
exports.clearAllEffect = clearAllEffect;
function setTitle(template) {
    var title = template.match(/<title>([\S\s]*?)<\/title>/m) || [];
    if (title[1]) {
        document.title = title[1];
    }
}
exports.setTitle = setTitle;
