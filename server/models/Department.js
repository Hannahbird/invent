const { Schema, model } = require('mongoose');

const deptSchema = new Schema();

const Department = model('Department', deptSchema);

module.exports = Department;