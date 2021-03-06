import locationData from "../models/locationData";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

class dbService {
  private locationSchema: Schema;
  private allowedUserDevice: Schema;
  private createdModel = false;
  private dbContext: any;
  constructor() {
    dotenv.config();
    this.allowedUserDevice = new Schema({
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      deviceId: {
        type: String,
        required: true,
      },
    });

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
        this.dbContext = mongoose.model(
          "location",
          this.locationSchema,
          "location"
        );
        this.createdModel = true;
      }
    } catch (error) {
      console.log(`err: ${error}`);
      throw error;
    }
  };

  VerifyUserDevice = async (
    username: string,
    password: string,
    deviceId: string
  ) => {
    const allowedUserDevice = await this.dbContext.findOne({
      username,
      password,
      deviceId,
    });
    if (allowedUserDevice) {
      return true;
    } else return false;
  };

  GetDeviceLocation = async (deviceId: string) => {
    await this.dbContext.findOne({}, {}, { sort: { date: -1 } }, function (
      post: any
    ) {
      return post;
    });
  };

  SaveLocationData = async (location: locationData) => {
    this.dbContext.save(location);
  };
}

export default dbService;
