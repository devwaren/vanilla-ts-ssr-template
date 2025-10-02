# Vanilla TypeScript Single Page Application (SSR)

## Main Features

- Single Page Application (SSR)
- TypeScript
- Vite
- TailwindCSS
- File Based Routing Pages
- Reusable Components
- Dynamic Metadata
- Dynamic HTML Elements
- React like syntax
- Vercel Deploy Ready

This is a single page application (SSR) built with [Vanilla TS](https://github.com/devwareng/vanilla-ts).

It uses [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).

## Getting Started

1. Clone the repository: `git clone https://github.com/devwareng/vanilla-ts-ssr.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the application in your browser: `http://localhost:5173`

## Deployment

1. Build the application: `npm run build`
2. Deploy the application: `npm run start`

```bash

npm run build
npm run start

```

## hooks

- useTSMetaData

It is used to set the metadata of the page.

```bash

useTSMetaData({
    name: "Home",
    description: "This is the home page",
    author: "John Doe",
    favicon: "favicon.ico",
    title: "Home",
})

```

name - The name of the page
description - The description of the page
author - The author of the page
favicon - The favicon of the page
title - The title of the page

this hook is used to dynamically set the metadata of the page. allows you to add favicon and title to your page.

- useTSElements

It is used to render string html elements to the page.

```bash

export default function App(DOM: HTMLElement) {
    
    const ui = useTSElements(
    DOM,
    html`
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
        </div>
    `,
)

return ui

}

```

DOM - The DOM element to render the html to the page
html - The html to render to the page allows you to use [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). 
more documentation will be added soon