# ark (方舟)

一个轻量版的微前端方案。

## 本地示例
1. git clone https://github.com/sadrun/ark.git
2. cd ark/packages/ark && npm start
也可自行进入 packages/ark/example：
1. yarn && yarn start

## 📦 安装
* yarn: yarn add @ark-plan/ark
* npm: npm install @ark-plan/ark --save

## 🔨 使用方式

1. 使用ark 创建 主框架

```ts

import { registerMicroApps } from '@ark-plan/ark';

function render({ template, loading, name}) {
  const container = document.getElementById('frameWork');
  ReactDOM.render(<Framework loading={loading} content={template} name={name}/>, container);
}

render({ loading: true });

registerMicroApps(
  [
    { name: 'home', entry: 'http://10.10.15.224:3000/home.html', render, activeRule:'/fe/home',isPreload:true, },
    { name: 'mall', entry: 'http://10.10.15.224:3000/mall.html', render, activeRule:'/fe/mall',isPreload:false,  },
    { name: 'point', entry: 'http://10.10.15.224:3000/point.html', render, activeRule:'/fe/point',isPreload:false,  },
  ],
  {
    index:'/fe/home'
  }
);

```

2. 应用结构，可不做任何调整，也可以按照如下规范：
```ts
   export async function willMount() {
     console.log('即将装载页面');
   }
   
   export async function mount() {
     ReactDOM.render(<App/>, document.getElementById('app'));
   }
   
   export async function unMount() {
     ReactDOM.unmountComponentAtNode(document.getElementById('app'));
   }
   ```

## 📖 API


```typescript
type ActiveRule = string|RegExp|((location:any) => boolean);

interface ICustomConfig {
    index?:string,
    [key:string]:any,
}

interface IApp {
    name:string,
    entry:string | { styles?: string[], scripts?: string[], html?: string },
    render:(props:{ template:string, loading:boolean, name?:string})=> any,
    activeRule:ActiveRule,
    isPreload?:boolean,
}

function registerMicroApps(apps: IApp[], config: ICustomConfig): void;
```