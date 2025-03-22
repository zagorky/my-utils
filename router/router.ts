import { Section } from '../helpers/factory.ts';
import { assertIsInstanceOf } from '@powwow-js/core';

// types
type RouteParameters = {
  path: string;
  view: () => HTMLElement;
};

type MatchesParameters = {
  route: RouteParameters;
  isPage: boolean;
};

//function
export function router(): void {
  const routes: RouteParameters[] = [
    { path: '/*', view: () => Section('error page') },
    { path: '/', view: () => Section('main page') },
  ];

  const matches: MatchesParameters[] = routes.map((route) => {
    return {
      route: route,
      isPage: location.pathname === route.path,
    };
  });

  let match = matches.find((page) => page.isPage);

  if (!match) {
    match = {
      route: routes[0],
      isPage: true,
    };
  }
  const view = match.route.view();
  document.body.replaceChildren(view);
}

export function navigator(url: string) {
  history.pushState(null, '', url);
  router();
}

// index ts

window.addEventListener('popstate', router);

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
  router();
});

// deploy https://github.com/MikAleinik/spa-deploy
