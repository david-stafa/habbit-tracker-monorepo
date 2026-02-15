import { createFileRoute } from '@tanstack/react-router'
import { RootPage } from '~/domains/root/RootPage'

export const Route = createFileRoute('/')({
  component: RootPage,
})
