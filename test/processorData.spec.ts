import processorData from "../src/services/processorData";
import chai from "chai";
import protocolMessage from "../src/models/protocolMessage";
const expect = chai.expect;
const SAMPLE_PING = "50F70A3F730150494E4773C4";

describe("Test receive data", function () {
  it("Determine if data is valid", function (done) {
    const processor = new processorData();
    const protocolResponse = getPingResponse();
    expect(processor.processMessage(SAMPLE_PING)).to.eql(protocolResponse);
    done();
  });
});

describe("Test ping response", function () {
  it("Determine if processor responds ping", function (done) {
    const processor = new processorData();
    expect(processor.processMessage(SAMPLE_PING)).to.eql(getPingResponse());
    done();
  });
});

function getPingResponse() {
  const protocolResponse = new protocolMessage();
  protocolResponse.Command = "01";
  protocolResponse.DeviceId = "0A3F73";
  protocolResponse.Footer = "73C4";
  protocolResponse.Header = "50F7";
  return protocolResponse;
}
