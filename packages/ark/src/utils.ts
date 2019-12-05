import { IListener } from './interfaces';

// 全局变量
let  lastGlobalVariableIndex:number;

export function recordCurAppGlobalVariable() {
    delete window.webpackJsonp;

    lastGlobalVariableIndex = 0;
  
    for (const p in window) {
      if (!window.hasOwnProperty(p)){
        continue;
      } 
      lastGlobalVariableIndex += 1;
    }
  
    return lastGlobalVariableIndex;
}

export function clearOldAppGlobalVariable(){
    const windowProps = [];
    for (const p in window) {
        if (!window.hasOwnProperty(p)) {
             continue; 
        }
        windowProps.push(p);
    }
    
    if(lastGlobalVariableIndex < windowProps.length){
        console.log('清除全局变量：',windowProps.slice(lastGlobalVariableIndex));
        windowProps.slice(lastGlobalVariableIndex).map((prop:any)=>{
            delete window[prop];
        })
    }
}

// window事件
const winAddListener = window.addEventListener;
const winRemoveListener = window.removeEventListener;
let curEventListener:IListener[] = []; 

export function proxyEventListener(){
    window.addEventListener = (event:string, handleFunction:any, useCapture:any=false)=>{
        curEventListener.push({
            event,
            handleFunction,
            useCapture,
        });
        winAddListener(event, handleFunction, useCapture);
    }
}

export function clearEventListener(){
    console.log('清除事件：',curEventListener);
    curEventListener.forEach((listener:any)=>{
        winRemoveListener(listener.event,listener.handleFunction,listener.useCapture)
    });
    curEventListener = [];
}

export function clearAllEffect(){
    clearOldAppGlobalVariable();
    clearEventListener()
}


export function setTitle(template:string){
    const title = template.match(/<title>([\S\s]*?)<\/title>/m) || [];
    if(title[1]){
        document.title=title[1];
    }
}