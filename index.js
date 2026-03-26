const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("API ONLINE");
});

// 🔥 LISTAR CONTAS GOOGLE ADS
app.post("/accounts", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: "access_token obrigatório" });
    }

    const response = await fetch(
      "https://googleads.googleapis.com/v16/customers:listAccessibleCustomers",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": process.env.DEVELOPER_TOKEN,
        },
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// porta correta pro Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Rodando na porta ${PORT}`);
});
