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

export type ValidChildDomValue<ElementType, TextNodeType> =
  Primitive | ElementType | TextNodeType | null | undefined

export type BindingFunc<ElementType, TextNodeType> =
  (dom: ElementType | TextNodeType | undefined) => ValidChildDomValue<ElementType, TextNodeType>

export type ChildDom<ElementType, TextNodeType> =
  | ValidChildDomValue<ElementType, TextNodeType>
  | StateView<Primitive | null | undefined>
  | BindingFunc<ElementType, TextNodeType>
  | readonly ChildDom<ElementType, TextNodeType>[]

type AddFunc<ElementType, TextNodeType> =
  (dom: ElementType, ...children: readonly ChildDom<ElementType, TextNodeType>[]) => ElementType

export type TagFunc<ElementType, TextNodeType, ResultType = ElementType> =
  (first?: Props | ChildDom<ElementType, TextNodeType>,
    ...rest: readonly ChildDom<ElementType, TextNodeType>[]) => ResultType

type Tags<ElementType, TextNodeType> = Record<string, TagFunc<ElementType, TextNodeType>>

// Tags type in browser context, which contains the signatures to tag functions that return
// specialized DOM elements.
interface BrowserTags extends Tags<Element, Text> {
  // Register known element types
  // Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element

  // Main root
  readonly html: TagFunc<Element, Text, HTMLHtmlElement>

  // Document metadata
  readonly base: TagFunc<Element, Text, HTMLBaseElement>
  readonly head: TagFunc<Element, Text, HTMLHeadElement>
  readonly link: TagFunc<Element, Text, HTMLLinkElement>
  readonly meta: TagFunc<Element, Text, HTMLMetaElement>
  readonly style: TagFunc<Element, Text, HTMLStyleElement>
  readonly title: TagFunc<Element, Text, HTMLTitleElement>

  // Sectioning root
  readonly body: TagFunc<Element, Text, HTMLBodyElement>

  // Content sectioning
  readonly h1: TagFunc<Element, Text, HTMLHeadingElement>
  readonly h2: TagFunc<Element, Text, HTMLHeadingElement>
  readonly h3: TagFunc<Element, Text, HTMLHeadingElement>
  readonly h4: TagFunc<Element, Text, HTMLHeadingElement>
  readonly h5: TagFunc<Element, Text, HTMLHeadingElement>
  readonly h6: TagFunc<Element, Text, HTMLHeadingElement>

  // Text content
  readonly blockquote: TagFunc<Element, Text, HTMLQuoteElement>
  readonly div: TagFunc<Element, Text, HTMLDivElement>
  readonly dl: TagFunc<Element, Text, HTMLDListElement>
  readonly hr: TagFunc<Element, Text, HTMLHRElement>
  readonly li: TagFunc<Element, Text, HTMLLIElement>
  readonly menu: TagFunc<Element, Text, HTMLMenuElement>
  readonly ol: TagFunc<Element, Text, HTMLOListElement>
  readonly p: TagFunc<Element, Text, HTMLParagraphElement>
  readonly pre: TagFunc<Element, Text, HTMLPreElement>
  readonly ul: TagFunc<Element, Text, HTMLUListElement>

  // Inline text semantics
  readonly a: TagFunc<Element, Text, HTMLAnchorElement>
  readonly br: TagFunc<Element, Text, HTMLBRElement>
  readonly data: TagFunc<Element, Text, HTMLDataElement>
  readonly q: TagFunc<Element, Text, HTMLQuoteElement>
  readonly span: TagFunc<Element, Text, HTMLSpanElement>
  readonly time: TagFunc<Element, Text, HTMLTimeElement>

  // Image and multimedia
  readonly area: TagFunc<Element, Text, HTMLAreaElement>
  readonly audio: TagFunc<Element, Text, HTMLAudioElement>
  readonly img: TagFunc<Element, Text, HTMLImageElement>
  readonly map: TagFunc<Element, Text, HTMLMapElement>
  readonly track: TagFunc<Element, Text, HTMLTrackElement>
  readonly video: TagFunc<Element, Text, HTMLVideoElement>

  // Embedded content
  readonly embed: TagFunc<Element, Text, HTMLEmbedElement>
  readonly iframe: TagFunc<Element, Text, HTMLIFrameElement>
  readonly object: TagFunc<Element, Text, HTMLObjectElement>
  readonly picture: TagFunc<Element, Text, HTMLPictureElement>
  readonly source: TagFunc<Element, Text, HTMLSourceElement>

  // Scripting
  readonly canvas: TagFunc<Element, Text, HTMLCanvasElement>
  readonly script: TagFunc<Element, Text, HTMLScriptElement>

  // Demarcating edits
  readonly del: TagFunc<Element, Text, HTMLModElement>
  readonly ins: TagFunc<Element, Text, HTMLModElement>

  // Table content
  readonly caption: TagFunc<Element, Text, HTMLTableCaptionElement>
  readonly col: TagFunc<Element, Text, HTMLTableColElement>
  readonly colgroup: TagFunc<Element, Text, HTMLTableColElement>
  readonly table: TagFunc<Element, Text, HTMLTableElement>
  readonly tbody: TagFunc<Element, Text, HTMLTableSectionElement>
  readonly td: TagFunc<Element, Text, HTMLTableCellElement>
  readonly tfoot: TagFunc<Element, Text, HTMLTableSectionElement>
  readonly th: TagFunc<Element, Text, HTMLTableCellElement>
  readonly thead: TagFunc<Element, Text, HTMLTableSectionElement>
  readonly tr: TagFunc<Element, Text, HTMLTableRowElement>

  // Forms
  readonly button: TagFunc<Element, Text, HTMLButtonElement>
  readonly datalist: TagFunc<Element, Text, HTMLDataListElement>
  readonly fieldset: TagFunc<Element, Text, HTMLFieldSetElement>
  readonly form: TagFunc<Element, Text, HTMLFormElement>
  readonly input: TagFunc<Element, Text, HTMLInputElement>
  readonly label: TagFunc<Element, Text, HTMLLabelElement>
  readonly legend: TagFunc<Element, Text, HTMLLegendElement>
  readonly meter: TagFunc<Element, Text, HTMLMeterElement>
  readonly optgroup: TagFunc<Element, Text, HTMLOptGroupElement>
  readonly option: TagFunc<Element, Text, HTMLOptionElement>
  readonly output: TagFunc<Element, Text, HTMLOutputElement>
  readonly progress: TagFunc<Element, Text, HTMLProgressElement>
  readonly select: TagFunc<Element, Text, HTMLSelectElement>
  readonly textarea: TagFunc<Element, Text, HTMLTextAreaElement>

  // Interactive elements
  readonly details: TagFunc<Element, Text, HTMLDetailsElement>
  readonly dialog: TagFunc<Element, Text, HTMLDialogElement>

  // Web Components
  readonly slot: TagFunc<Element, Text, HTMLSlotElement>
  readonly template: TagFunc<Element, Text, HTMLTemplateElement>
}

export interface VanObj<ElementType, TextNodeType> {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: <T>(s: T | StateView<T>) => T
  readonly oldVal: <T>(s: T | StateView<T>) => T
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: AddFunc<ElementType, TextNodeType>
  readonly _: (f: () => PropValue) => () => PropValue
  readonly tags: Tags<ElementType, TextNodeType>
  readonly tagsNS: (namespaceURI: string) => Tags<ElementType, TextNodeType>

  // Mini-Van specific API
  html: (first?: Props | ChildDom<ElementType, TextNodeType>,
    ...rest: readonly ChildDom<ElementType, TextNodeType>[]) => string
}

export interface Van extends VanObj<Element, Text> {
  readonly vanWithDoc: <ElementType, TextNodeType>(doc: {
    createElement(s: any): ElementType,
    createTextNode(s: any): TextNodeType,
  }) => VanObj<ElementType, TextNodeType>
  readonly tags: BrowserTags
}

declare const van: Van

export default van
