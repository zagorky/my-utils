import { assertIsInstanceOf } from '@powwow-js/core';

// add init method witch takes config
// add dynamic imports
// make router asynchronous
// add signal in the pages

type PathType = {
  path: string;
  view: (signal: AbortSignal) => Promise<HTMLElement>;
};

type RouterConfig = {
  routes: PathType[];
};

let abortController: AbortController | null = null;

// config
const config: RouterConfig = {
  routes: [
    {
      path: '/',
      view: async (signal: AbortSignal): Promise<HTMLElement> => {
        const module = await import('../pages/main/main-page.ts');
        return module.mainPage(signal);
      },
    },
    {
      path: '/another',
      view: async (signal: AbortSignal): Promise<HTMLElement> => {
        const module = await import('../pages/another-page/another-page.ts');
        return module.anotherPage(signal);
      },
    },
  ],
};

// export function init(routerConfig:RouterConfig) {
//   config = routerConfig
//   router().then(r => r);
// }

// router
export async function router(): Promise<void> {
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();
  const signal = abortController.signal;

  let match = config.routes.find((route) => location.pathname === route.path);

  if (!match) {
    match = {
      path: '/*',
      view: async (): Promise<HTMLElement> => {
        const module = await import('../pages/error-page/error-page.ts');
        return module.errorPage();
      },
    };
  }

  const view = await match.view(signal);
  if (!signal.aborted) {
    document.body.replaceChildren(view);
  }
}

export function navigator(url: string) {
  history.pushState(null, '', url);
  router().catch((error) => {
    console.error('router error in navigator:', error);
  });
}

// index ts

window.addEventListener('popstate', () => {
  router().catch((error) => {
    console.error('router error:', error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    assertIsInstanceOf(HTMLElement, event.target);
    if (event.target.matches('[data-href]')) {
      event.preventDefault();
      const href = event.target.dataset.href;
      if (href) {
        navigator(href);
      }
    }
  });
  router().catch((error) => {
    console.error('router error in event listener:', error);
  });
});
