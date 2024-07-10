export interface State<T> {
  val: T
  readonly oldVal: T
  readonly rawVal: T
}

// Defining readonly view of State<T> for covariance.
// Basically we want StateView<string> to implement StateView<string | number>
export type StateView<T> = Readonly<State<T>>

export type Primitive = string | number | boolean | bigint

export type PropValue = Primitive | ((e: any) => void) | null

declare function state<T>(): State<T>
declare function state<T>(initVal: T): State<T>

// A generic Van object that can be shared on both client-side and server-side.
// Tag functions and `add` don't have too much type checking as it's hard to unify
// the type system for DOM nodes between client-side and server-side.
export interface VanObj {
  readonly state: typeof state
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: Function
  readonly tags: Record<string, Function> & ((namespaceURI: string) => Record<string, Function>)
}

export type StateOf<T> = { readonly [K in keyof T]: State<T[K]> }
export type ValueType<T> = T extends (infer V)[] ? V : T[keyof T]
export type KeyType<T> = T extends unknown[] ? number : string
export type ReplacementFunc<T> =
  T extends (infer V)[] ? (items: V[]) => readonly V[] :
  (items: [string, T[keyof T]][]) => readonly [string, T[keyof T]][]

export interface VanXObj {
  readonly calc: <R>(f: () => R) => R
  readonly reactive: <T extends object>(obj: T) => T
  readonly noreactive: <T extends object>(obj: T) => T
  readonly stateFields: <T extends object>(obj: T) => StateOf<T>
  readonly raw: <T extends object>(obj: T) => T
  readonly list: <T extends object>
    (container: any, items: T,
    itemFunc: (v: State<ValueType<T>>, deleter: () => void, k: KeyType<T>) => any) => any
  readonly replace: <T extends object>(obj: T, replacement: ReplacementFunc<T> | T) => T
  readonly compact: <T extends object>(obj: T) => T
}

export interface EnvObj {
  readonly van: VanObj
  readonly vanX: VanXObj
}

export const env: EnvObj = <EnvObj>{}

export const registerEnv = (input: Partial<EnvObj>) => {
  if (input.van) (<any>env).van = input.van
  if (input.vanX) (<any>env).vanX = input.vanX
}

export const dummyVanX: VanXObj = {
  calc: f => f(),
  reactive: obj => obj,
  noreactive: obj => obj,
  stateFields: <T extends object>(obj: T) => {
    const states = Array.isArray(obj) ? [] : {__proto__: Object.getPrototypeOf(obj)}
    for (const [k, v] of Object.entries(obj)) states[k] = env.van.state(v)
    return <StateOf<T>>states
  },
  raw: obj => obj,
  list: (container, items, itemFunc) => {
    if (container instanceof Function) container = container()
    const isArray = Array.isArray(items)
    for (const [k, v] of Object.entries(items))
      env.van.add(container, itemFunc(env.van.state(v), () => {}, <any>(isArray ? Number(k) : k)))
    return <any>container
  },
  replace: obj => obj,
  compact: obj => obj,
}
