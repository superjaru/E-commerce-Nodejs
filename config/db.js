const { MongoClient } = require('mongodb');

const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI, {
        serverApi: {
            version: '1', // Specify the API version as a string
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    } finally {
        await client.close();
    }
}

module.exports = connectDB;
