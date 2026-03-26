const express = require("express");
const dotenv = require("dotenv");
const { GoogleAdsApi } = require("google-ads-api");

dotenv.config();

const app = express();
app.use(express.json());

const client = new GoogleAdsApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  developer_token: process.env.DEVELOPER_TOKEN,
});

// 🔥 LISTAR CONTAS
app.post("/accounts", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    const customer = client.Customer({
      customer_id: process.env.CUSTOMER_ID,
      refresh_token,
    });

    const result = await customer.query(`
      SELECT
        customer_client.id,
        customer_client.descriptive_name
      FROM customer_client
      WHERE customer_client.level <= 1
    `);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Google Ads Service rodando na porta 3000");
});