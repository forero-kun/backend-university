const pg = require("pg");

class postgresService {
  constructor() {
    this.connectionString = "postgresql://postgres:123@localhost:5432/university";
    this.pool = new pg.Pool({ connectionString: this.connectionString });
  }

  async executeSQL(sql) {
    let result = await this.pool.query(sql);
    return result;
  }

  async executeSQLData(sql, data) {
    let result = await this.pool.query(sql, data);
    return result;
  }
}

module.exports = postgresService;
