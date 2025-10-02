import { Img } from '@/components/Image';
import { html, useTSElements, useTSEvent, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Index(DOM: HTMLElement) {

  useTSMetaData({
    name: 'Home | Vanilla TS SSR',
    description: 'Page Description',
    author: 'Your Name',
    favicon: 'ts.webp',
    title: "Home | Vanilla TS SSR",
  });

  let count = 0;

  const tsLogo = Img({
    src: '/ts.webp',
    alt: 'TS Logo',
    width: 100,
    height: 100,
    className: 'mx-auto',
  })

  const viteLogo = Img({
    src: '/vite.webp',
    alt: 'Vite Logo',
    width: 100,
    height: 100,
    className: 'mx-auto',
  })

  const ui = useTSElements(
    DOM,
    html`
      <div class="p-4 animate__animated animate__fadeIn duration-300 grid place-items-center min-h-screen">
        <div class="text-center flex flex-col">
          <div class="flex items-center gap-4 justify-center">
            <div>
              ${tsLogo}
            </div>
            <div>
              ${viteLogo}
            </div>
          </div>
          <button id="counter" class="my-9 border rounded px-4 py-2 w-fit mx-auto">Count is 0</button>
          <p>Edit <code>src/pages/index.ts</code> and save to test HMR</p>
        </div>
      </div>
    `,

  );

  useTSEvent("counter", "click", (e) => {
    count++;
    const el = e.target as HTMLButtonElement;
    el.innerText = `Count is ${count}`
  });

  return ui
}