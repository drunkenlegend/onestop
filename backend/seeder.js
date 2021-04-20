//this is to mport all the data and is not connected to anything
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import product from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config() //has Mongo_URI

connectDB()

//to connect this script to db

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany() //it returns promises so we don't wanna add it again to Db thus deleteing await

        const createdUsers = await User.insertMany(users) //array to have values of diff. users

        const adminUser = createdUsers[0]._id //taking admin from abv array _id as everything gets stored by id in this fromat

        const sampleProducts = product.map((product) => {
            //add admin user to each one
            return { ...product, user: adminUser } //... is spread operator, to user field in sample products add adminUser
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported')
        process.exit()
    } catch (errror) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany() //it returns promises so we don't wanna add it again to Db thus deleteing await

        console.log('Data Destroyed')
        process.exit()
    } catch (errror) {
        console.error(`${error}`)
        process.exit(1)
    }
}

//to have coomand to destry data ie -d for destroy, compare the parameter ie ergv[2] == -d
if (process.argv[2] == '-d') {
    destroyData()
} else {
    importData()
}
