import * as net from "net";
import * as wp from "workerpool";
import processorData from "./processorData";
const workerpool = wp.pool();

class tcpServiceConnection {
  Port!: Number;
  processor: processorData;

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
          const request = buffer.toString();
          workerpool
            .exec(() => this.processor.processMessage(request), [])
            .then((res) => {
              socket.write(res);
              socket.end();
            });
        })
      );
  }
}
