export interface State<T> {
    val: T;
    readonly oldVal: T;
}
export type StateView<T> = Readonly<State<T>>;
export type Primitive = string | number | boolean | bigint;
export type PropValue = Primitive | ((e: any) => void) | null;
export interface VanObj {
    readonly state: <T>(initVal?: T) => State<T>;
    readonly derive: <T>(f: () => T) => State<T>;
    readonly add: Function;
    readonly tags: Record<string, Function> & ((namespaceURI: string) => Record<string, Function>);
}
