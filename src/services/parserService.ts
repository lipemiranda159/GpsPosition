import protocolMessage from "../models/protocolMessage";
import locationData from "../models/locationData";

export default class parserService {
  private static readonly FOOTER_LENGTH = 4;
  private static readonly HEADER_LENGTH = 4;
  private static readonly END_DEVICEID = 10;
  private static readonly START_COMMAND = 10;
  private static readonly END_COMMAND = 12;

  public static ParseToProtocolMessage(data: string) {
    const requestData = new protocolMessage();
    requestData.Header = data.substring(0, this.HEADER_LENGTH);
    requestData.DeviceId = data.substring(
      this.HEADER_LENGTH,
      this.END_DEVICEID
    );
    requestData.Command = data.substring(this.START_COMMAND, this.END_COMMAND);
    requestData.Data = data.substring(
      this.END_COMMAND,
      data.length - this.FOOTER_LENGTH
    );
    requestData.Footer = data.substring(
      this.END_COMMAND + requestData.Data.length,
      data.length
    );
    return requestData;
  }

  public static ParseToLocationData(data: string): locationData {
    return new locationData();
  }
}
