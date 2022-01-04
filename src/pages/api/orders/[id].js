import Order     from '../../../models/Order.js'
import dbConnect from '../../../utils/mongo.js'

export default async function handler (req, res) {
  const { method, query: { id } } = req

  await dbConnect()

  if (method === 'GET') {
    try {
      const order = await Order.findById(id)
      res.status(200).json({ success: true, order })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
  if (method === 'PUT') {
    debugger
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.status(200).json({ success: true, order })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
