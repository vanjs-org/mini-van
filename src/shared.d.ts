export interface State<T> {
    val: T;
    readonly oldVal: T;
}
export type StateView<T> = Readonly<State<T>>;
export type Primitive = string | number | boolean | bigint;
export type PropValue = Primitive | ((e: any) => void) | null;

declare function state<T>(initVal: T): State<T>
declare function state<T>(): State<T | undefined>

export interface VanObj {
    readonly state: typeof state;
    readonly val: <T>(s: T | StateView<T>) => T;
    readonly oldVal: <T>(s: T | StateView<T>) => T;
    readonly derive: <T>(f: () => T) => State<T>;
    readonly add: Function;
    readonly _: (f: () => PropValue) => () => PropValue;
    readonly tags: Record<string, Function>;
    readonly tagsNS: (namespaceURI: string) => Record<string, Function>;
}
