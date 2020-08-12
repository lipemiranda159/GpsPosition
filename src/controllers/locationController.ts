import { Request, Response } from "express";
import dbService from "../services/dbService";

class locationController {
  private db: dbService;
  constructor() {
    this.db = new dbService();
  }

  getLocation = async (request: Request, response: Response) => {
    const { deviceId } = request.params;
    try {
      const result = await this.db.GetDeviceLocation(deviceId);
      response.send(result);
    } catch (e) {
      response.status(500).send({ res: `${e}` });
    }
  };
}

export default locationController;
