import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'todoapp';

interface MongoClientGlobal {
  mongoClient?: Promise<MongoClient>;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoClient: MongoClientGlobal['mongoClient'];
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

console.log('Initializing MongoDB connection to:', MONGODB_URI);

if (process.env.NODE_ENV === 'development') {
  if (!global.mongoClient) {
    console.log('Creating new MongoDB client connection...');
    client = new MongoClient(MONGODB_URI);
    global.mongoClient = client.connect().then((c) => {
      console.log('MongoDB client connected successfully');
      return c;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  } else {
    console.log('Using existing MongoDB client connection');
  }
  clientPromise = global.mongoClient!;
} else {
  console.log('Creating MongoDB client for production');
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  console.log('Getting database:', DB_NAME);
  const client = await clientPromise;
  return client.db(DB_NAME);
}

