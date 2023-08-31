export interface State<T> {
  val: T
  readonly oldVal: T
}

// Defining readonly view of State<T> for covariance.
// Basically we want StateView<string> to implement StateView<string | number>
export type StateView<T> = Readonly<State<T>>

export type Primitive = string | number | boolean | bigint

export type PropValue = Primitive | ((e: any) => void) | null

// A generic Van object that can be shared on both client-side and server-side.
// Tag functions and `add` don't have too much type checking as it's hard to unify
// the type system for DOM nodes nbetween client-side and server-side.
export interface VanObj {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: <T>(s: T | StateView<T>) => T
  readonly oldVal: <T>(s: T | StateView<T>) => T
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: Function
  readonly _: (f: () => PropValue) => () => PropValue
  readonly tags: Record<string, Function>
  readonly tagsNS: (namespaceURI: string) => Record<string, Function>
}
