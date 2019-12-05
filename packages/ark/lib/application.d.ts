import { ICustomConfig } from './interfaces';
export declare function registerApplication(name: string, loadAppFun: () => Promise<any>, preLoad: (() => Promise<any>) | null, isActive: (location: any) => (boolean | undefined)): void;
export declare function initRouter(config?: ICustomConfig): void;
export declare function goto(title: string, href: string): void;
export declare function preLoadApp(): void;
