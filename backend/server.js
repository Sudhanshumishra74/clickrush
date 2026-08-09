import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/common/config/db.js";
 

const PORT =  process.env.PORT || 5000

 const serverStart = async () => {
   await connectDB();
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
 }

 serverStart().catch((err) => {
     console.error('Error starting server:', err);
     process.exit(1);
 })