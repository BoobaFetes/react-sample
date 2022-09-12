import { ShouldBeOverridedError } from "./ShouldBeOverridedError";

describe("Error", () => {
  describe("ShouldBeOverridedError", () => {
    it("should implements Error", () => {
      const actual = new ShouldBeOverridedError("something");
      expect(actual instanceof Error).toBeTruthy();
    });

    it.each`
      message
      ${"your message"}
      ${"what ever you want as long as it's a string"}
    `(
      "should have the message ''$message' should be overrided !'",
      ({ message }: { message: string }) => {
        const actual = new ShouldBeOverridedError(message);
        expect(actual.message).toBe(`${message} should be overrided !`);
      }
    );
  });
});
