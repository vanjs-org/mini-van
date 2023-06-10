type Primitive = string | number | boolean | bigint

export interface Props {
  readonly [key: string]: Primitive
}

export interface Element { render(): string }

export type ChildDom = Primitive | Element | readonly ChildDom[] | null | undefined

export type TagFunc = (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => Element

export type Tags = {
  readonly [key: string]: TagFunc
}

declare const van: {
  readonly add: (dom: Element, ...children: readonly ChildDom[]) => Element
  readonly tags: Tags
  readonly html: (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => string
}

export default van
