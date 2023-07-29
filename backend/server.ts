import express from "express";
import userRouter from "./routes/userRouter";

const app = express();
const port = process.env.DEV_PORT || 8000;

app.use(express.json()); // Парсинг JSON запросов

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Замените на адрес вашего клиентского приложения
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
