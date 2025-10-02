import { html, useTSElements } from '@devwareng/vanilla-ts'

export default function Navbar(DOM: HTMLElement) {


    const ui = useTSElements(
        DOM,
        html`
        <div>
            <h1>Navbar</h1>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </div>
        `
    );
    return ui
}