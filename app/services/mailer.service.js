const nodemailer = require("nodemailer");

class mailerServices {
	constructor() {
		this.setup();
		this.from = '"University" <testeobackend4569852@gmail.com>';
	}

	async setup() {
		this.transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "testeobackend4569852@gmail.com",
				pass: "pbqndiuprskwsdpc"
			},
		});
	}
	async send(to, subject, body) {
		await this.transporter.sendMail({
			from: this.from,
			to: to,
			subject: subject,
			html: body,
		});
	}
}

module.exports = mailerServices;
