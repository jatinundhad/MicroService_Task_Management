import mongoose from "mongoose";

// Connect to MongoDB
try {
    mongoose.connect("mongodb://localhost:27017/task_service", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
} catch(e){
    console.log("Error connecting to MongoDB");
    console.log(e);
}
