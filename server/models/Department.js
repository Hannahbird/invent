const { Schema, model } = require('mongoose');

const deptSchema = new Schema(
    {
        deptName: {
            type: String,
            required: true,
            trim: true
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
        signUpLink: {
            type: String,
            trim: true
        }
    }
);

//maybe do a pre-save function here to auto generate the sign-up Link??

const Department = model('Department', deptSchema);

module.exports = Department;