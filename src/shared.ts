import type {
  AddFunc as PlateAddFunc,
  BindingFunc as PlateBindingFunc,
  ChildDom as PlateChildDom,
  HtmlFunc as PlateHtmlFunc,
  Primitive,
  Props,
  PropValue,
  State,
  StateView,
  Tags as PlateTags,
  TagsNSFunc as PlateTagsNSFunc,
  UnderscoreFunc,
  ValidChildDomValue as PlateValidChildDomValue,
  Van as PlateVan
} from './van-plate'
import type {
  AddFunc as MiniAddFunc,
  BindingFunc as MiniBindingFunc,
  ChildDom as MiniChildDom,
  HtmlFunc as MiniHtmlFunc,
  Tags as MiniTags,
  TagsNSFunc as MiniTagsNSFunc,
  ValidChildDomValue as MiniValidChildDomValue,
} from './mini-van'
export type { Primitive, Props, PropValue, State, StateView, UnderscoreFunc }

export type ValidChildDomValue<V extends VanShape = PlateVan> = Exclude<V['_ValidChildDomValue'], undefined>

export type BindingFunc<V extends VanShape = PlateVan> = Exclude<V['_BindingFunc'], undefined>

export type ChildDom<V extends VanShape = PlateVan> = Exclude<V['_ChildDom'], undefined>

export type AddFunc<V extends VanShape = PlateVan> = V['add']

export type TagFunc<V extends VanShape = PlateVan> = V['tags'][string]

export type Tags<V extends VanShape = PlateVan> = V['tags']

// A generic Van object that can be shared on both client-side and server-side.
// Tag functions and `add` don't have too much type checking as it's hard to unify
// the type system for DOM nodes in between client-side and server-side.
export interface VanObj<
  V extends VanShape = PlateVan
> {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: <T>(s: T | StateView<T>) => T
  readonly oldVal: <T>(s: T | StateView<T>) => T
  readonly derive: <T>(f: () => T) => State<T>
  readonly add: V['add']
  readonly _: UnderscoreFunc
  readonly tags: V['tags']
  readonly tagsNS: V['tagsNS']
  readonly html: V['html']
}
export type VanShape = {
  readonly state:<T>(initVal:T)=>State<T>
  readonly val:<T>(s:T|StateView<T>)=>T
  readonly oldVal:<T>(s:T|StateView<T>)=>T
  readonly derive:<T>(f:()=>T)=>State<T>
  readonly _:UnderscoreFunc
}&(({
  readonly _BindingFunc?:PlateBindingFunc
  readonly _ChildDom?:PlateChildDom
  readonly _ValidChildDomValue?:PlateValidChildDomValue
  readonly add: PlateAddFunc
  readonly html: PlateHtmlFunc
  readonly tags: PlateTags
  readonly tagsNS: PlateTagsNSFunc
})|({
  readonly _BindingFunc?:MiniBindingFunc<any, any>
  readonly _ChildDom?:MiniChildDom<any, any>
  readonly _ValidChildDomValue?:MiniValidChildDomValue<any, any>
  readonly add: MiniAddFunc<any, any>
  readonly html: MiniHtmlFunc<any, any>
  readonly tags: MiniTags<any, any>
  readonly tagsNS: MiniTagsNSFunc<any, any>
}))
