const ExcelJS = require("exceljs");

class ExcelServices {
	constructor() {
		this.workbook = new ExcelJS.Workbook();
	}
	async crearHojaPersonas(persons) {
		const sheet = this.workbook.addWorksheet("Persons");
		sheet.columns = [
			{header: "Id", key: "id", width: 10},
			{header: "Name", key: "name", width: 10},
			{header: "Email", key: "email", width: 10},
		];
		persons.forEach((person) => {
			sheet.addRow(person);
		});
		await this.workbook.xlsx.writeFile("app/statics/university.xlsx");
	}
}
module.exports = ExcelServices;
