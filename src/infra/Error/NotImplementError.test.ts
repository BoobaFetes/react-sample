import { NotImplementedError } from "./NotImplementedError";

describe("Error", () => {
  describe("NotImplementedError", () => {
    it("should implements Error", () => {
      const actual = new NotImplementedError();
      expect(actual instanceof Error).toBeTruthy();
    });

    it("should have the message 'Not implemented yet !'", () => {
      const actual = new NotImplementedError();
      expect(actual.message).toBe("Not implemented yet !");
    });
  });
});
