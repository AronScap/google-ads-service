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
app.get("/", (req, res) => {
  res.send("API ONLINE");
});
app.post("/accounts", async (req, res) => {
  return res.json({ ok: true });
});

// 🔥 ESSA PARTE É O SEGREDO
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Rodando na porta ${PORT}`);
});
