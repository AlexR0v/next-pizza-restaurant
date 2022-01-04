import Product   from '../../../models/Product.js'
import dbConnect from '../../../utils/mongo.js'

export default async function handler (req, res) {
  const { method, query: { id }, cookies } = req
  const token = cookies.token

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
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!')
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.status(200).json({ success: true, product })
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!')
    }
    try {
      await Product.findByIdAndDelete(id)
      const products = await Product.find()
      res.status(200).json({ success: true, products })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
