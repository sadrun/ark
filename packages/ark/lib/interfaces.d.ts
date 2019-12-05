export declare type ActiveRule = string | RegExp | ((location: any) => boolean);
export declare type Entry = string | {
    styles?: string[];
    scripts?: string[];
    html?: string;
};
export interface IApp {
    name: string;
    entry: Entry;
    render: (props: {
        template: string;
        loading: boolean;
        name?: string;
    }) => any;
    activeRule: ActiveRule;
    isPreload?: boolean;
}
export interface ICustomConfig {
    index?: string;
    [key: string]: any;
}
export interface IRApp {
    name: string;
    loadAppFun: () => Promise<any>;
    preLoad: (() => Promise<any>) | null;
    isActive: (location: any) => (boolean | undefined);
}
export interface IListener {
    event: string;
    handleFunction: any;
    useCapture: any;
}
