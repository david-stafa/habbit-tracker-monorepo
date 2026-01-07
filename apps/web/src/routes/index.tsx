import { createFileRoute } from '@tanstack/react-router'
import { IndexComponent } from './(components)/-IndexComponent'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})
