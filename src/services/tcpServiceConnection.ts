import * as net from "net";
import * as wp from "workerpool";
import processorData from "./processorData";

class tcpServiceConnection {
  Port!: Number;
  processor: processorData;
  workerpool = wp.pool();

  constructor(port: Number, ip: string) {
    this.Port = port;
    this.processor = new processorData();
  }

  public startServer() {
    net
      .createServer()
      .listen(this.Port)
      .on("connection", (socket: any) =>
        socket.on("data", (buffer: any) => {
          this.workerpool
            .exec(() => this.processor.processMessage(buffer.toString()), [])
            .then((res) => {
              socket.write(res);
            });
        })
      );
  }
}
