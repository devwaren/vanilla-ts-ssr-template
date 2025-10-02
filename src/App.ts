import { html, useTSCollection, useTSElements, useTSNoReload, useTSSSRHydration } from '@devwareng/vanilla-ts'
import { Router } from './routes/__root';
import "./index.css"

export default function App(DOM?: HTMLElement) {

  const { isDOM } = useTSSSRHydration(DOM!)
  if (!isDOM) return ''

  const ui = useTSElements(
    isDOM,
    html`
      <div class="min-h-screen text-white bg-gradient-to-tr from-cyan-900 to-blue-600">
        <div id="routes"></div>
      </div>
    `
  )

  useTSNoReload(isDOM)

  const sections = ["routes"]
  const components = [Router]

  useTSCollection(sections, isDOM, components)
  return ui
}