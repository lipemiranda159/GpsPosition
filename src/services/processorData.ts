import protocolMessage from "../models/protocolMessage";

const FOOTER_LENGTH = 4;
const HEADER_LENGTH = 4;
const END_DEVICEID = 10;
const START_COMMAND = 10;
const END_COMMAND = 12;
const HEADER_VALUE = "50F7";
const FOOTER_VALUE = "73C4";
const PING_COMMAND = "01";

class processorData {
  public processMessage(data: string) {
    const protocolMessage = this.ParseToModel(data);
    if (this.DataIsValid(protocolMessage)) {
      if (protocolMessage.Command === PING_COMMAND) {
        return this.ProcessPing(protocolMessage);
      }
    }
  }

  private ProcessPing(protocolRequest: protocolMessage) {
    const protocolResponse = new protocolMessage(protocolRequest);
    protocolResponse.Command = PING_COMMAND;
    return protocolResponse;
  }
  private DataIsValid(protocolMessage: protocolMessage) {
    return (
      protocolMessage.Header === HEADER_VALUE &&
      protocolMessage.Footer === FOOTER_VALUE
    );
  }

  private ParseToModel(data: string) {
    const requestData = new protocolMessage();
    requestData.Header = data.substring(0, HEADER_LENGTH);
    requestData.DeviceId = data.substring(HEADER_LENGTH, END_DEVICEID);
    requestData.Command = data.substring(START_COMMAND, END_COMMAND);
    requestData.Data = data.substring(END_COMMAND, data.length - FOOTER_LENGTH);
    requestData.Footer = data.substring(
      END_COMMAND + requestData.Data.length,
      data.length
    );
    return requestData;
  }
}

export default processorData;
