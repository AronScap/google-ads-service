import express from "express";
import dotenv from "dotenv";
import { GoogleAdsApi } from "google-ads-api";

dotenv.config();

const app = express();
app.use(express.json());

const client = new GoogleAdsApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  developer_token: process.env.DEVELOPER_TOKEN,
});

// teste
app.get("/", (req, res) => {
  res.send("API ONLINE");
});

// 🔥 LISTAR CONTAS
app.post("/accounts", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: "refresh_token obrigatório" });
    }

    const customer = client.Customer({
      customer_id: process.env.CUSTOMER_ID,
      refresh_token,
    });

    const result = await customer.listAccessibleCustomers();

    res.json(result);

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Rodando na porta ${PORT}`);
});
