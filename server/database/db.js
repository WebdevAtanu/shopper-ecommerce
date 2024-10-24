import mongoose from 'mongoose';
const url=process.env.DB_URL;
const database='shopper';
const dbConnection=async()=>{
	mongoose.connect(`${url}/${database}`)
	.then(()=>{
		console.log('database connected');
	}).catch(error=>{
		console.log('database error', error)
	})
}

export default dbConnection;