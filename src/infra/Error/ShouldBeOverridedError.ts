export class ShouldBeOverridedError extends Error {
  constructor(name: string) {
    super(`${name} should be overrided !`);
  }
}
