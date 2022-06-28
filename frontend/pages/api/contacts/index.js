import axios from "axios";

export default async function contacts(req, res) {
  if (req.method === "POST") {
    const { contact } = req.body;
    const { ws_fi } = req.cookies;
    if (contact) {
      try {
        const { data } = await axios({
          url: `${process.env.API_URL}/contacts`,
          method: "POST",
          headers: { Authorization: `Bearer ${ws_fi}` },
          data: { contact },
        });
        res.status(200).json(data);
      } catch (err) {
        res.status(406).json(err.response.data);
      }
    }
  } else if (req.method === "GET") {
    const { ws_fi, user_id } = req.cookies;
    try {
      const { data } = await axios({
        url: `${process.env.API_URL}/contacts/${user_id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${ws_fi}` },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(406).json(err.response.data);
    }
  }
}
