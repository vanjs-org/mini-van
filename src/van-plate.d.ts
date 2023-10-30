export interface State<T> {
  val: T
  readonly oldVal: T
}

// Defining readonly view of State<T> for covariance.
// Basically we want StateView<string> to implement StateView<string | number>
export type StateView<T> = Readonly<State<T>>

export type Primitive = string | number | boolean | bigint

export type PropValue = Primitive | ((e: any) => void) | null | undefined

export type Props = Record<string, PropValue | StateView<PropValue> | (() => PropValue)>

export interface Element { render(): string }

export type ValidChildDomValue = Primitive | Element | null | undefined

export type BindingFunc = (dom: any) => ValidChildDomValue

export type ChildDom = ValidChildDomValue | StateView<Primitive | null | undefined> | BindingFunc | readonly ChildDom[]

export type TagFunc = (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => Element

export interface Van {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: <T>(s: T | StateView<T>) => T
  readonly oldVal: <T>(s: T | StateView<T>) => T
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: (dom: Element, ...children: readonly ChildDom[]) => Element
  readonly _: (f: () => PropValue) => () => PropValue
  readonly tags: Readonly<Record<string, TagFunc>>
  readonly tagsNS: (namespaceURI: string) => Readonly<Record<string, TagFunc>>
  readonly html: (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => string
}

declare const van: Van

export default van
