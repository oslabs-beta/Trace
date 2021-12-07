import { MiddlewareGenerator } from './generator.mjs';

function middleware(generator) {
  return new MiddlewareGenerator(generator);
}

export { middleware };
