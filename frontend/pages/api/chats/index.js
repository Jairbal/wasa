import axios from "axios";

export default async function chats(req, res) {
  if (req.method === "POST") {
    const { chat } = req.body;
    const { ws_fi } = req.cookies;
    if (chat) {
      try {
        const { data } = await axios({
          url: `${process.env.API_URL}/chats`,
          method: "POST",
          headers: { Authorization: `Bearer ${ws_fi}` },
          data: { chat },
        });
        res.status(201).json(data);
      } catch (err) {
        res.status(406).json(err.response.data);
      }
    }
  }

  if (req.method === "GET") {
    const { ws_fi } = req.cookies;
    const { user_id } = req.cookies;
    try {
      const { data } = await axios({
        url: `${process.env.API_URL}/chats/${user_id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${ws_fi}` },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(406).json(err.response.data);
    }
  }
}
