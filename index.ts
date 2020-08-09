import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor em execucao`);
});
