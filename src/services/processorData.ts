import protocolMessage from "../models/protocolMessage";
import dbService from "./dbService";
import projectConstants from "../constants/projectConstants";
import parserService from "./parserService";

const HEADER_VALUE = "50F7";
const FOOTER_VALUE = "73C4";

const db = new dbService();

class processorData {
  private processLocation(protocolRequest: protocolMessage) {
    const data = parserService.ParseToLocationData(protocolRequest.Data);
    db.SaveLocationData(data);
  }

  private ProcessPing(protocolRequest: protocolMessage) {
    const protocolResponse = new protocolMessage(protocolRequest);
    protocolResponse.Command = projectConstants.PING_COMMAND;
    return protocolResponse;
  }
  private DataIsValid(protocolMessage: protocolMessage) {
    return (
      protocolMessage.Header === HEADER_VALUE &&
      protocolMessage.Footer === FOOTER_VALUE
    );
  }

  private verifyDeviceId(DeviceId: string) {
    if (db.ExistDevice(DeviceId)) {
      return true;
    }

    throw new InvalidDeviceIdException();
  }

  public processMessage(data: string) {
    const protocolMessage = parserService.ParseToProtocolMessage(data);
    if (
      this.DataIsValid(protocolMessage) &&
      this.verifyDeviceId(protocolMessage.DeviceId)
    ) {
      switch (protocolMessage.Command) {
        case projectConstants.PING_COMMAND:
          return this.ProcessPing(protocolMessage);
        case projectConstants.LOCATION_COMMAND:
          return this.processLocation(protocolMessage);
        default:
          throw new InvalidCommandException();
      }
    }
  }
}

export default processorData;
