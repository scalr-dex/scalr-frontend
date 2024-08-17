import { ComponentChildren, JSX } from 'preact'

export interface ClassNameProp {
  className?: JSX.HTMLAttributes<HTMLDivElement>['className']
}

export interface OnClickProp {
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}

export interface ChildrenProp {
  children: ComponentChildren
}

export interface DefaultModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
}
