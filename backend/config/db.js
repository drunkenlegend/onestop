import mongoose from 'mongoose'


const connectDB = async() =>{
	try{
		const conn= await mongoose.connect(process.env.MONGO_URI ,{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		})
		console.log(`MongoDB Connected: $(conn.connection.host}`) //display the host connectiom
	}
	catch(error){
		console.error(`Error: ${error.message}`)
		process.exit(1) //exiting the process with  failure
	}
}

export default connectDB