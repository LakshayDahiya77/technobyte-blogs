import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/router/routes.js";
import Blog from "./src/model/blog.js";

// Initialize Express app
const app = express();

const blog = new Blog();

// Load environment variables from .env file
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_HOST || 'mongodb://localhost:27017/blogDB';

dotenv.config();

// CORS Config
const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://127.0.0.1', 'http://127.0.0.1:5500'], // Specify your allowed frontend origins as an environment variable
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};



app.use(session({ secret: 'YOUR_SESSION_SECRET', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies for this app

// Basic route


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(DB);
            // useNewUrlParser: true,   These options are no longer needed or have changed in behavior 
            // useUnifiedTopology: true   in newer versions of the driver.
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1); // Exit process with failure
    }
};

// Handle POST request to create a new blog entry
app.post('/blogs/create', async (req, res) => {
    const { title, content, image, review, reviewMessage, tags, comments } = req.body;

    try {
        // Create a new blog instance using the Blog schema
        const newBlog = new Blog({ title, content, review, reviewMessage}); //left image, tags and comments as not working

        // Save the new blog entry to MongoDB
        const savedBlog = await newBlog.save();
        console.log('Blog saved successfully:', savedBlog);

        // Respond with a success message to check its working
        res.status(201).json({ success: true, message: 'Blog created successfully!', blog: savedBlog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ success: false, message: 'Error creating blog.', error: error.message });
    }
});

// Start server and connect to database
const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });

    routes(app);
};

startServer();
