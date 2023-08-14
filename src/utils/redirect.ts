/* eslint-disable @typescript-eslint/no-empty-function */
import { NextPageContext } from 'next';

export const redirect = async (route: string, ctx?: NextPageContext) => {
  if (ctx?.res) {
    ctx.res.writeHead(307, { Location: route });
    ctx.res.end();
  } else {
    // We'll redirect to the external page using
    // `window.location`.
    window.location.assign(route);
    // While the page is loading, code execution will
    // continue, so we'll await a never-resolving
    // promise to make sure our page never
    // gets rendered.
    await new Promise(() => {});
  }
};
