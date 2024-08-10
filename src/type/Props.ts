import { ComponentChildren, JSX } from 'preact'

export interface ClassNameProp {
  className?: JSX.HTMLAttributes<HTMLDivElement>['className']
}

export interface ChildrenProp {
  children: ComponentChildren
}
