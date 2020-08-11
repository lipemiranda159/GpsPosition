import locationData from "../models/locationData";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

class dbService {
  private locationSchema: Schema;
  private createdModel = false;
  private dbContext: any;
  constructor() {
    dotenv.config();
    this.locationSchema = new Schema({
      date: {
        type: Date,
        required: true,
      },
      Direction: {
        type: Number,
        required: true,
      },
      Distance: {
        type: String,
        required: true,
      },
      Time: {
        type: Number,
        required: true,
      },
      Status: {
        type: trackStatus,
        required: true,
      },
      Speed: {
        type: Number,
        required: true,
      },
      Lat: {
        type: Number,
        required: true,
      },
      Long: {
        type: Number,
        required: true,
      },
    });
  }

  connect = async () => {
    try {
      const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kvtie.gcp.mongodb.net/gps?retryWrites=true&w=majority`;

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      if (!this.createdModel) {
        this.dbContext = mongoose.model("Bank", this.locationSchema, "Bank");
        this.createdModel = true;
      }
    } catch (error) {
      console.log(`err: ${error}`);
      throw error;
    }
  };
  public ExistDevice(deviceId: string) {
    return true;
  }

  public SaveLocationData(location: locationData) {}
}

export default dbService;
