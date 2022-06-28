const pool = require("../lib/mariadb");

class ApiKeyService {
    constructor() {
        this.table = "tb_api_key";
        this.pool = pool.getConnection();
    }

    async getApiKey({token}) {
        let query = `SELECT * FROM ${this.table} WHERE apke_token = '${token}'`;
        try {
            const conn = await this.pool.getConnection();
            const [apikey] = await conn.query(query);
            conn.end();
            return apikey;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ApiKeyService;