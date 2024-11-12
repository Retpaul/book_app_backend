import app from "./app.js";
import connectDb from "./config/dbConnect.js";

connectDb()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});