import { H1, Main, Section } from '../../helpers/factory.ts';

export function errorPage(): HTMLElement {
  return Main(Section([drawHeading()]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('404 - Page Not Found');
}
