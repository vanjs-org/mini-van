import type {
  BindingFunc as MiniBindingFunc,
  ChildDom as MiniChildDom,
  TagFunc as MiniTagFunc,
  Tags as MiniTags,
  ValidChildDomValue as MiniValidChildDomValue,
  Van as MiniVan
} from './mini-van'
import type {
  BindingFunc as PlateBindingFunc,
  ChildDom as PlateChildDom,
  Primitive,
  Props,
  PropValue,
  State,
  StateView,
  TagFunc as PlateTagFunc,
  Tags as PlateTags,
  UnderscoreFunc,
  ValidChildDomValue as PlateValidChildDomValue,
  Van as VanPlate
} from './van-plate'

export type { Primitive, Props, PropValue, State, StateView, UnderscoreFunc }

export type ValidChildDomValue<V extends VanShape> =
  V extends MiniVan
    ? MiniValidChildDomValue<Element, Text>
    : PlateValidChildDomValue

export type BindingFunc<V extends VanShape> =
  V extends MiniVan
    ? MiniBindingFunc<Element, Text>
    : PlateBindingFunc

export type ChildDom<V extends VanShape> =
  V extends MiniVan
    ? MiniChildDom<Element, Text>
    : PlateChildDom

export type AddFunc<V extends VanShape> = V['add']

export type TagFunc<V extends VanShape> =
  V extends MiniVan
    ? MiniTagFunc<Element, Text>
    : PlateTagFunc

export type Tags<V extends VanShape> =
  V extends MiniVan
    ? MiniTags<Element, Text>
    : PlateTags

export type TagsNSFunc<V extends VanShape> = V['tagsNS']

// A generic Van object that can be shared on both client-side and server-side.
// Tag functions and `add` don't have too much type checking as it's hard to unify
// the type system for DOM nodes in between client-side and server-side.
export interface VanObj<V extends VanShape> {
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
type VanCommon = {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: <T>(s: T|StateView<T>) => T
  readonly oldVal: <T>(s: T|StateView<T>) => T
  readonly derive: <T>(f: () => T) => State<T>
  readonly _: UnderscoreFunc
}
export type VanShape = VanCommon&(MiniVan|VanPlate)
