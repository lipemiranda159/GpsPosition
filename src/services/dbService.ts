import locationData from "../models/locationData";

class dbService {
  public ExistDevice(deviceId: string) {
    return true;
  }

  public SaveLocationData(location: locationData) {}
}

export default dbService;
