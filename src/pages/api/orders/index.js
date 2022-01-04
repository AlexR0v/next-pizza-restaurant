import Order     from '../../../models/Order.js'
import dbConnect from '../../../utils/mongo.js'

export default async function handler (req, res) {
  const { method, body } = req

  await dbConnect()

  if (method === 'GET') {
    try {
      const orders = await Order.find()
      res.status(200).json({ success: true, orders })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
  if (method === 'POST') {
    try {
      const order = await Order.create(body)
      res.status(201).json({ success: true, order })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
}
