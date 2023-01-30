import { simpleConvert } from "./simpleConvert";

describe("SimpleConvert unit tests", () => {
  it("Should return original string", () => {
    const fileContentsAsString = `<div>I do not have a deprecated class</div>`;
    expect(simpleConvert(fileContentsAsString)).toEqual(fileContentsAsString);
  });

  it("Should return updated code", () => {
    const fileContentsAsString = `<div className="deprecated-class">I have a deprecated class</div>`;
    const updatedContents = `<div class="new-class">I have a deprecated class</div>`;
    expect(simpleConvert(fileContentsAsString)).toEqual(updatedContents);
  });
});
