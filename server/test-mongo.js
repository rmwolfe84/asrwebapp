require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Get the URI from environment variables
const uri = process.env.MONGODB_URI;
console.log('Using URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    // Connect the client to the server
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    
    // List all databases
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
    // Connect to the allsquare database
    const database = client.db('allsquare');
    
    // List all collections
    const collections = await database.listCollections().toArray();
    console.log('\nCollections in allsquare database:');
    collections.forEach(collection => console.log(` - ${collection.name}`));
    
    // Count documents in blogposts collection if it exists
    if (collections.some(coll => coll.name === 'blogposts')) {
      const count = await database.collection('blogposts').countDocuments();
      console.log(`\nBlog Posts count: ${count}`);
      
      // Get a sample document
      const samplePost = await database.collection('blogposts').findOne();
      console.log('\nSample blog post:');
      console.log(` - Title: ${samplePost.title}`);
      console.log(` - Status: ${samplePost.status}`);
      console.log(` - Date: ${samplePost.publishDate}`);
    }
    
    console.log('\nConnection test successful.');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

run().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});