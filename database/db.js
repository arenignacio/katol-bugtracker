require('dotenv').config();

module.exports = {
	db: `mongodb+srv://edsign7923:${process.env.DB_PW}@portfolio-projects.5ksle.mongodb.net/Katol?retryWrites=true&w=majority`,
};
