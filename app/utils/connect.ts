import mongoose from "mongoose";

const connect = async () => mongoose.connect(process.env.DATABASE_URL as string);

export default connect;
