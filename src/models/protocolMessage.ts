export default class protocolMessage {
  Header!: string;
  DeviceId!: string;
  Command!: string;
  Data!: string;
  Footer!: string;

  /**
   *
   */
  constructor(data?: protocolMessage) {
    if (data) {
      this.Header = data.Header;
      this.DeviceId = data.DeviceId;
      this.Command = data.Command;
      this.Footer = data.Footer;
    }
  }
}
