import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
 //api request to orders and add new items
const addOrderItems =asyncHandler(async(req,res) => {
	const {orderItems,shippingAddress, paymentMethod, taxPrice,totalPrice,shippingPrice,itemsPrice}=req.body
	if(orderItems && orderItems.length ===0){
		res.status(400)
		throw new Error('No order items')
		return
	}
	else{
		const order=new Order({user: req.user._id,orderItems,shippingAddress, paymentMethod, taxPrice,totalPrice,shippingPrice,itemsPrice})
		const createOrder=await order.save()
		res.status(201).json(createdOrder)
	}

})
export{addOrderItems}