import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
//api request to orders and add new items
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        totalPrice,
        shippingPrice,
        itemsPrice,
    } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            totalPrice,
            shippingPrice,
            itemsPrice,
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email',
    )
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

export { addOrderItems, getOrderById, updateOrderToPaid }
