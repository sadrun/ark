
import { IRApp, ICustomConfig} from './interfaces';

const apps:IRApp[] = [];
let prefixAppUnMount:any = null;

export function registerApplication(
    name:string,
    loadAppFun: ()=>Promise<any>,
    preLoad: (()=>Promise<any>) | null,
    isActive:(location:any) => (boolean | undefined)
){
    apps.push({
        name,
        loadAppFun,
        preLoad,
        isActive,
    })
}

function getActivityApp(location = window.location){
    for (let i = 0; i < apps.length; i++) {
        if (apps[i].isActive(location)) {
           return  apps[i]
        }
    }
    return null;
}

function loadApp(){
    prefixAppUnMount && prefixAppUnMount(); // 卸载
    const activeApp = getActivityApp();
    if(activeApp){
        activeApp.loadAppFun().then(({  willMount, mount, unMount })=>{
            if(typeof willMount === 'function'){
                willMount();
            }
            if(typeof mount === 'function'){
                mount();
            }
            prefixAppUnMount = unMount;
        })
    }else {
        console.log('microApps未匹配到对应应用')
    }
}

export function initRouter(config:ICustomConfig={}){
    window.addEventListener('popstate',(event)=>{
        console.log('popstate event',event);
        if(event.state && event.state.type === 'microApps'){
            loadApp();
        }
    })
    if(getActivityApp()){
        loadApp();
    }else if(config.index){
        goto('',config.index)
    }
}


export function goto(title:string, href:string) { // 状态对象用来后续区分应用自己路由和微方案路由
    window.history.pushState({type:'microApps'}, title, href);
    loadApp();
}

export function preLoadApp(){
    for (let i = 0; i < apps.length; i++) {
        // @ts-ignore
        !!apps[i].preLoad && apps[i].preLoad() 
    }
}

