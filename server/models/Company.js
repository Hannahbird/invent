const { model } = require('mongoose');

const companySchema = new Schema();

const Company = model('Company', companySchema);

module.exports = Company;