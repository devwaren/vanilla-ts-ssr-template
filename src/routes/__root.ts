import { createRouter } from "@/gen/tsrouter.gen";
import { useTSParams } from "@devwareng/vanilla-ts";

// This file is auto-generated

export const Router = (DOM: HTMLElement) => {
  useTSParams.getState();
  const router = createRouter(DOM);
  router.navigate(window.location.pathname);

  window.addEventListener("popstate", () => {
    router.navigate(window.location.pathname);
  });
};