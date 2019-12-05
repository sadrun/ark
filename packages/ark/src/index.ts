import { importEntry } from 'import-html-entry';
import { registerApplication, initRouter, goto as _goto, preLoadApp, }  from './application';
import { recordCurAppGlobalVariable, clearAllEffect, proxyEventListener, setTitle }  from './utils';
import { ActiveRule, IApp ,ICustomConfig} from './interfaces';

function getActiveRule(routerPrefix:ActiveRule) {
  return (location:any) =>{
    if(typeof routerPrefix === 'string'){
      return location.pathname.startsWith(routerPrefix);
    }
    if(typeof routerPrefix === 'object' && routerPrefix.test){
      return routerPrefix.test(location.pathname)
    }
    if(typeof routerPrefix === 'function'){
      return routerPrefix(location);
    }
  } 
}

export const goto = _goto;

export function registerMicroApps(apps:IApp[],config:ICustomConfig){
  
    apps.forEach(async (app:IApp) => {
      const { name, entry,render,activeRule,isPreload } = app;

      registerApplication(name,
          async ()=>{
            // 获取入口 html 模板及脚本加载器
            const { template, execScripts } = await importEntry(entry);
            render({ template, loading: true, name});
            setTitle(template);
            clearAllEffect();

            recordCurAppGlobalVariable();

            const  { willMount, mount, unMount } = await execScripts();
            
            return {
              willMount,
              mount:()=>{
                mount && mount();
                render({ template, loading: false,name });
              },
              unMount
            }
          },
          !!isPreload ? async ()=>{
            // 预加载
            const { getExternalScripts } = await importEntry(entry);
            await getExternalScripts();
          } : null,
          getActiveRule(activeRule), 
      )
    })
    preLoadApp();
    initRouter(config);
    proxyEventListener();
}

