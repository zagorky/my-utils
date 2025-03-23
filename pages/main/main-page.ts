import { H1, Main, Section } from '../../helpers/factory.ts';

export function mainPage(signal: AbortSignal): HTMLElement {
  console.log(signal);
  return Main(Section([drawHeading()]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Main page');
}
