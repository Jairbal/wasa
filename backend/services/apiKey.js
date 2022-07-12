const { pool } = require("../lib/mariadb");

class ApiKeyService {
  constructor() {
    this.table = "tb_api_key";
    this.pool = pool;
  }

  async getApiKey({ token }) {
    let query = `SELECT * FROM ${
      this.table
    } WHERE apke_token = ${this.pool.escape(token)}`;
    try {
      const [apikey] = await this.pool.query(query);
      return apikey;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ApiKeyService;
