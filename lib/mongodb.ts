import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var mongoClient: undefined | Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  if (!global.mongoClient) {
    client = new MongoClient(uri, options);
    global.mongoClient = client.connect();
  }
  clientPromise = global.mongoClient;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('todoapp');
}

