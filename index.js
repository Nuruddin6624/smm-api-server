const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 নিরাপদভাবে .env থেকে API key নেয়
const smmsunAPIKey = process.env.SMM_API;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🟢 SMM API server is live!');
});

app.post('/place-order', async (req, res) => {
  const { service_id, link, quantity } = req.body;

  try {
    const response = await axios.post('https://smmsun.com/api/v2', {
      key: smmsunAPIKey,
      action: 'add',
      service: service_id,
      link: link,
      quantity: quantity
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || 'Server Error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
app.get('/services', async (req, res) => {
  try {
    const response = await axios.post('https://smmsun.com/api/v2', {
      key: smmsunAPIKey,
      action: 'services'
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || 'Error fetching services' });
  }
});
