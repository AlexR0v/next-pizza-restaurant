export default async function handler (req, res) {
  const { method, body } = req

  if (method === 'GET') {
    try {
      res.status(200).json({ success: true })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
  if (method === 'POST') {
    try {
      console.log(body)
      res.status(201).json({ success: true, order: { _id: '123' } })
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
}
