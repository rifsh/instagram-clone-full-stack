import { connection } from "./dbconnection";
import app from ".";
import { errorHandler } from "./api/middlewares/errorMiddleare";

app.use(errorHandler);


connection()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);

})