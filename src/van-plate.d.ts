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

export type BindingFunc = (dom?: Element) => ValidChildDomValue

export type ChildDom = ValidChildDomValue | StateView<Primitive | null | undefined> | BindingFunc | readonly ChildDom[]

export type AddFunc = (dom: Element, ...children: readonly ChildDom[]) => Element

export type TagFunc = (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => Element

export type Tags = Readonly<Record<string, TagFunc>>

export type TagsNSFunc = (namespaceURI: string) => Readonly<Record<string, TagFunc>>

export type HtmlFunc = (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => string

export type UnderscoreFunc = (f: () => PropValue) => () => PropValue

export interface ElementProto {
  render(): string
  renderToBuf(buf:string[]): void
}

export interface Van {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: <T>(s: T | StateView<T>) => T
  readonly oldVal: <T>(s: T | StateView<T>) => T
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: AddFunc
  readonly _: UnderscoreFunc
  readonly tags: Tags
  readonly tagsNS: TagsNSFunc
  readonly html: HtmlFunc
}

declare const van: Van

export default van
