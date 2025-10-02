import App from "./App";

export async function render(_url: string) {
  const appHtml = App();

  return {
    body: appHtml,
    head: {
      title: "Vanilla TS SSR",
      favicon: "/ts.webp",
    },
  };
}
