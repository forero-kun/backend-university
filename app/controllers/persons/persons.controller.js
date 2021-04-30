const postgresService = require("../../services/postgres.service");
const mailerServices = require("../../services/mailer.service");
const ExcelServices = require("../../services/excel.service");
const _pg = new postgresService();
const _nodemailer = new mailerServices();
const _exceljs = new ExcelServices();

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createPerson = async (req, res) => {
	try {
		let person = req.body;
		let sql = `INSERT INTO public.persons (name, email)
        VALUES($1, $2)`;
		let data = [person.name, person.email];
		let result = await _pg.executeSQLData(sql, data);
		if (result.rowCount == 1) {
			let subject = "Welcome";
			let body = `<h1>Hi ${person.name} Welcome to the university</h1>`;
			await _nodemailer.send(person.email, subject, body);
		}
		return res.send({
			ok: result.rowCount == 1,
			message:
				result.rowCount == 1
					? "Register"
					: "Error",
			content: person,
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "Error",
			content: error,
		});
	}
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createReport = async (req, res) => {
	try {
		let sql = `SELECT * FROM public.persons`;
		let result = await _pg.executeSQL(sql);
		let row = result.rows;
		await _exceljs.crearHojaPersonas(row);
		return res.send({
			ok: true,
			message: "Report created",
			url: "http://localhost:3000/statics/university.xlsx",
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "Error",
			url: error,
		});
	}
};

module.exports = {createReport, createPerson};
