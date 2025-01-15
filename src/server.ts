import express from "express";
import { routes } from "./routes";
import "express-async-errors";
import { errorHandler } from "./modules/handlers/ErrorHandler";

const app = express();

app.use(express.json());
app.use(routes);


app.use(errorHandler);

app.listen(3000, () => console.log("server is running"));
