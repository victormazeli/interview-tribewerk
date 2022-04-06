import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors"
import v1Router from "./routes";

const app = express();

//request handling
app.use(morgan('dev'));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/api/v1', (req, res, next) => {
//     res.status(200).json({ status: "success", message: "Welcome to Dreamax API V1" })
// });

app.use("/api/v1", v1Router);


//error page handling
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
const port = process.env.PORT || 8052;

app.listen(port,() => {
    console.log(`listening http://localhost:${port}/`)
})

