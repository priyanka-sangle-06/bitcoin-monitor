const axios = require("axios");

export async function getCurrentPrice() {
  const response = await axios.get(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );

  return response.data;
}
