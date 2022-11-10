const { Schema, model } = require('mongoose');
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 6 });

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
        },
        reserveCode: {
            type: String,
            trim: true,
            default: "failed",
            set: (s) => {
                return uid();
            }
        }
    }
);

const Company = model('Company', companySchema);

module.exports = Company;