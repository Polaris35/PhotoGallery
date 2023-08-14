import express from "express";
import userRouter from "./routes/userRouter";
import imageRouter from "./routes/imageRouter";
import cors from "cors";
import fileUpload from "express-fileupload";
import auth from "./middleware/auth";

const app = express();
const port = process.env.DEV_PORT || 8000;

app.use(fileUpload());
app.use(express.json()); // Парсинг JSON запросов

app.use(cors({
    origin: 'http://localhost:3000', // замените на адрес вашего frontend приложения
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // укажите нужные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // добавьте необходимые заголовки
}));
  
app.use("/api/user", userRouter);
app.use('/api/image', imageRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
