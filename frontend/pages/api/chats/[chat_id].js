import axios from "axios";

export default async function chat(req, res) {
  if (req.method === "GET") {
    const { chat_id } = req.query;
    const { ws_fi, user_id } = req.cookies;
    try {
      const { data } = await axios({
        url: `${process.env.API_URL}/chats/${chat_id}/${user_id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${ws_fi}` },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err.response.data);
    }
  }
}
