const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const smmsunAPIKey = "10cc6955ab1767e42922f945e529f981";

const serviceMap = {
  "101": 4567,
  "102": 8910
};

app.post('/place-order', async (req, res) => {
  const { service_id, link, quantity } = req.body;

  const smmsunServiceId = serviceMap[service_id];
  if (!smmsunServiceId) {
    return res.status(400).json({ success: false, message: "Invalid service_id" });
  }

  try {
    const response = await axios.post("https://smmsun.com/api/v2", {
      key: smmsunAPIKey,
      action: "add",
      service: smmsunServiceId,
      link,
      quantity
    });

    return res.json({
      success: true,
      order: response.data.order
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

