import processorData from "../src/services/processorData";
import chai from "chai";
const expect = chai.expect;
describe("Test receive data", function () {
  it("Determine if data is valid", function (done) {
    const processor = new processorData();
    expect(processor.DataIsValid(done)).to.equal(true);
  });
});
