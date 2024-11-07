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

export type Props = Record<string, PropValue | StateView<PropValue> | (() => PropValue)>

interface HasFirstChild {firstChild?: unknown}

type NodeType<ElementType extends HasFirstChild> =
  Omit<ElementType["firstChild"], "after" | "before" | "remove" | "replaceWith">

export type ValidChildDomValue<ElementType extends HasFirstChild, TextNodeType> =
  Primitive | ElementType | NodeType<ElementType> | TextNodeType | null | undefined

export type BindingFunc<ElementType extends HasFirstChild, TextNodeType> =
  | ((dom?: ElementType | TextNodeType) => ValidChildDomValue<ElementType, TextNodeType>)
  | ((dom?: ElementType) => ElementType)

export type ChildDom<ElementType extends HasFirstChild, TextNodeType> =
  | ValidChildDomValue<ElementType, TextNodeType>
  | StateView<Primitive | null | undefined>
  | BindingFunc<ElementType, TextNodeType>
  | readonly ChildDom<ElementType, TextNodeType>[]

type AddFunc<ElementType extends HasFirstChild, TextNodeType> =
  (dom: ElementType, ...children: readonly ChildDom<ElementType, TextNodeType>[]) => ElementType

export type TagFunc<ElementType extends HasFirstChild, TextNodeType, ResultType = ElementType> =
  (first?: Props | ChildDom<ElementType, TextNodeType>,
    ...rest: readonly ChildDom<ElementType, TextNodeType>[]) => ResultType

type Tags<ElementType extends HasFirstChild, TextNodeType> =
  Readonly<Record<string, TagFunc<ElementType, TextNodeType>>>

// Tags type in browser context, which contains the signatures to tag functions that return
// specialized DOM elements.
type BrowserTags = Tags<Element, Text> & {
  [K in keyof HTMLElementTagNameMap]: TagFunc<Element, Text, HTMLElementTagNameMap[K]>
}

declare function state<T>(): State<T>
declare function state<T>(initVal: T): State<T>

export interface VanObj<ElementType extends HasFirstChild, TextNodeType> {
  readonly state: typeof state
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: AddFunc<ElementType, TextNodeType>
  readonly tags: Tags<ElementType, TextNodeType> & ((namespaceURI: string) => Tags<ElementType, TextNodeType>)

  // Mini-Van specific API
  html: (first?: Props | ChildDom<ElementType, TextNodeType>,
    ...rest: readonly ChildDom<ElementType, TextNodeType>[]) => string
}

export interface Van extends VanObj<Element, Text> {
  readonly vanWithDoc: <ElementType extends HasFirstChild, TextNodeType>(doc: {
    createElement(s: any): ElementType,
    createTextNode(s: any): TextNodeType,
  }) => VanObj<ElementType, TextNodeType>
  readonly tags: BrowserTags & ((namespaceURI: string) => Tags<Element, Text>)
}

declare const van: Van

export default van
