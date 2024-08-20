import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./DB/index.js"

dotenv.config({
    path:"./env"
});


async function startServer() {
    try {
        await connectDB();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at Port: ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("MONGO db connection failed !!!!", err);
    }
}

startServer();
