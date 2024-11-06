import { HTMLAttributes, ReactNode } from 'react'

export type ClassName = HTMLAttributes<HTMLDivElement>['className']
export type Style = HTMLAttributes<HTMLDivElement>['style']

export interface ClassNameProp {
  className?: ClassName
}

export interface StyleProp {
  style?: Style
}

export type OnClickEvent<T extends Element> = React.MouseEvent<T>
export interface OnClickProp<T extends Element> {
  onClick?: OnClickEvent<T>
}
export type OnClickPropVoid = {
  onClick?: () => void
}

export type IconProp = { icon: ReactNode }

export interface ChildrenProp {
  children?: ReactNode
}

export interface DefaultModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
  onCloseCallback?: () => void
  dismissible?: boolean
}
