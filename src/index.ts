import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authMiddleware from "./middleware/authMiddleware";
import authRoute from "./routes/authRoute";
import locationRoute from "./routes/locationRoute";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use(authMiddleware);
app.use("/", authRoute);
app.use("/api/v1", locationRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor em execucao`);
});
