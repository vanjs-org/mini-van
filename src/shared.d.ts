export interface State<T> {
    val: T;
    readonly oldVal: T;
    readonly rawVal: T;
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
export type StateOf<T> = {
    readonly [K in keyof T]: State<T[K]>;
};
export type ValueType<T> = T extends (infer V)[] ? V : T[keyof T];
export type KeyType<T> = T extends unknown[] ? number : string;
export type ReplacementFunc<T> = T extends (infer V)[] ? (items: V[]) => readonly V[] : (items: [string, T[keyof T]][]) => readonly [string, T[keyof T]][];
export interface VanXObj {
    readonly calc: <R>(f: () => R) => R;
    readonly reactive: <T extends object>(obj: T) => T;
    readonly noreactive: <T extends object>(obj: T) => T;
    readonly stateFields: <T extends object>(obj: T) => StateOf<T>;
    readonly raw: <T extends object>(obj: T) => T;
    readonly list: <T extends object>(container: any, items: T, itemFunc: (v: State<ValueType<T>>, deleter: () => void, k: KeyType<T>) => any) => any;
    readonly replace: <T extends object>(obj: T, replacement: ReplacementFunc<T> | T) => T;
    readonly compact: <T extends object>(obj: T) => T;
}
export interface EnvObj {
    readonly van: VanObj;
    readonly vanX: VanXObj;
}
export declare const env: EnvObj;
export declare const registerEnv: (input: Partial<EnvObj>) => void;
export declare const dummyVanX: VanXObj;
export {};
