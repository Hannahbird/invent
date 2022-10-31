const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const deptSchema = new Schema(
    {
        deptName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        signUpLink: {
            type: String,
            trim: true
        }
    }
);

//this provides a unique index bsed on the department name and the company id
//this ensures no company has more than one department with the same name, while
//preserving the ability to have the same department name used by different companies
deptSchema.index({ deptName: 1, company: 1 }, { unique: true });
deptSchema.plugin(uniqueValidator);
//maybe do a pre-save function here to auto generate the sign-up Link??

const Department = model('Department', deptSchema);

module.exports = Department;