

export default function login(req, res) {
  res.redirect(`${process.env.API_URL}/auth/google`);
}
