import protocolMessage from "../models/protocolMessage";
import locationData from "../models/locationData";

export default class parserService {
  private static readonly FOOTER_LENGTH = 4;
  private static readonly HEADER_LENGTH = 4;
  private static readonly END_DEVICEID = 10;
  private static readonly START_COMMAND = 10;
  private static readonly END_COMMAND = 12;
  private static readonly DATE_LENGHT = 8;
  private static readonly END_DIRECTION = 12;
  private static readonly END_DISTANCE = 20;
  private static readonly END_TIME = 28;
  private static readonly END_STATUS = 32;
  private static readonly START_SPEED = 36;
  private static readonly END_SPEED = 38;
  private static readonly END_LAT = 46;
  private static readonly END_LONG = 54;

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
    const location = new locationData();
    location.Date = new Date(
      numberService.hexToInt(data.substring(0, this.DATE_LENGHT))
    );
    location.Direction =
      numberService.hexToInt(
        data.substring(this.DATE_LENGHT, this.END_DIRECTION)
      ) / 100;
    location.Distance = numberService.hexToInt(
      data.substring(this.END_DIRECTION, this.END_DISTANCE)
    );
    location.Time = numberService.hexToInt(
      data.substring(this.END_DISTANCE, this.END_TIME)
    );
    location.Status = this.ParseStatus(
      data.substring(this.END_TIME, this.END_STATUS)
    );
    location.Speed = numberService.hexToInt(
      data.substring(this.START_SPEED, this.END_SPEED)
    );
    location.Lat = numberService.hexToInt(
      data.substring(this.END_SPEED, this.END_LAT)
    );
    location.Long = numberService.hexToInt(
      data.substring(this.END_LAT, this.END_LONG)
    );

    return location;
  }

  private static ParseStatus(data: string): trackStatus {
    return new trackStatus();
  }
}
