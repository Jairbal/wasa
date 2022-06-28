import axios from "axios";

export default async function users(req, res) {
  if (req.method === "PUT") {
    const { user_id } = req.query;
    const { user } = req.body;
    const { ws_fi } = req.cookies;
    if (user && user_id) {
      try {
        const { data } = await axios({
          url: `${process.env.API_URL}/users/${user_id}`,
          method: "PUT",
          headers: { Authorization: `Bearer ${ws_fi}` },
          data: { user },
        });
        res.status(200).json(data);
      } catch (err) {
        res.status(406).json(err.response.data);
      }
    }
  }
}
