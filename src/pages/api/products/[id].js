import Product   from '../../../models/Product.js'
import dbConnect from '../../../utils/mongo.js'

export default async function handler (req, res) {
  const { method, query: { id } } = req

  await dbConnect()

  if (method === 'GET') {
    try {
      const product = await Product.findById(id)
      res.status(200).json({ success: true, product })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
  if (method === 'PUT') {
    try {
      const product = await Product.create(req.body)
      res.status(201).json({ success: true, product })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
  if (method === 'DELETE') {
    try {
      const product = await Product.create(req.body)
      res.status(201).json({ success: true, product })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
}
