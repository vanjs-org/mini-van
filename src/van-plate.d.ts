export interface State<T> {
  val: T
  readonly oldVal: T
}

// Defining readonly view of State<T> for covariance.
// Basically we want StateView<string> to implement StateView<string | number>
export type StateView<T> = Readonly<State<T>>

export type Primitive = string | number | boolean | bigint

export type PropValue = Primitive | ((e: any) => void) | null

export type Props = Record<string, PropValue | StateView<PropValue> | (() => PropValue)>

export interface Element { render(): string }

export type ValidChildDomValue = Primitive | Element | null | undefined

export type BindingFunc = (dom: any) => ValidChildDomValue

export type ChildDom = ValidChildDomValue | StateView<Primitive | null | undefined> | BindingFunc | readonly ChildDom[]

export type TagFunc = (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => Element

declare function state<T>(): State<T>
declare function state<T>(initVal: T): State<T>

export interface Van {
  readonly state: typeof state
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: (dom: Element, ...children: readonly ChildDom[]) => Element
  readonly tags: Readonly<Record<string, TagFunc>> & ((namespaceURI: string) => Readonly<Record<string, TagFunc>>)
  readonly html: (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => string
}

declare const van: Van

export default van
