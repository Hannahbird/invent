const { Schema, model } = require('mongoose');

const companySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        companyEmail: {
            type: String,
            required: true,
            trim: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        }
    }
);

const Company = model('Company', companySchema);

module.exports = Company;