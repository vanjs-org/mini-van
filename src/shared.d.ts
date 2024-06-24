export interface State<T> {
    val: T;
    readonly oldVal: T;
}
export type StateView<T> = Readonly<State<T>>;
export type Primitive = string | number | boolean | bigint;
export type PropValue = Primitive | ((e: any) => void) | null;
declare function state<T>(): State<T>;
declare function state<T>(initVal: T): State<T>;
export interface VanObj {
    readonly state: typeof state;
    readonly derive: <T>(f: () => T) => State<T>;
    readonly add: Function;
    readonly tags: Record<string, Function> & ((namespaceURI: string) => Record<string, Function>);
}

export declare function getVan(): VanObj
export declare function vanWrap<T>(van: VanObj, cb: (van: VanObj) => T): T
export declare function vanWrapper<CB extends (...opts: any[]) => any>(cb: CB): CB

type removeFromGlobal = () => void
export declare function useGlobalVan(cb: VanObj): removeFromGlobal
