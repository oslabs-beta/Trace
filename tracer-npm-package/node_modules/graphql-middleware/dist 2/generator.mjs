class MiddlewareGenerator {
  constructor(generator) {
    this.generator = generator;
  }
  generate(schema) {
    return this.generator(schema);
  }
}

export { MiddlewareGenerator };
