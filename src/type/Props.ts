import { ComponentChildren, JSX } from 'preact'

export type ClassName = JSX.HTMLAttributes<HTMLDivElement>['className']
export type Style = JSX.HTMLAttributes<HTMLDivElement>['style']

export interface ClassNameProp {
  className?: ClassName
}

export interface StyleProp {
  style?: Style
}

export interface OnClickProp {
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}

export type OnClickEvent = JSX.TargetedMouseEvent<HTMLButtonElement>

export interface ChildrenProp {
  children: ComponentChildren
}

export interface DefaultModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
}
