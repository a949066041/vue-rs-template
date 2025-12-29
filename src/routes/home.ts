import { createFileRoute } from '@tanstack/vue-router'
import { h } from 'vue'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return h('div', {}, 'Hello "/home"!')
}
