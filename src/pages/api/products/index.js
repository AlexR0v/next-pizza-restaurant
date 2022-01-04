import Product   from '../../../models/Product.js'
import dbConnect from '../../../utils/mongo.js'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  if (method === 'GET') {
    try {
      const products = await Product.find({})
      res.status(200).json({ success: true, products })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
  if (method === 'POST') {
    try {
      const product = await Product.create(req.body)
      res.status(201).json({ success: true, product })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
}
