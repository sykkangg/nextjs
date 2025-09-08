import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
  throw new Error('MONGODB_URI 환경변수를 설정해주세요')
}

// interface MongooseConnection {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// let cached: MongooseConnection = (global as any).mongoose;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB 연결 성공');
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error);
    throw error;
  }
}