const mongoose = require('mongoose');

const assigmentSchema = new mongoose.Schema({
    employeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    startDate: { type: Date, required: true },
});

const ProjectAssigment = mongoose.models.ProjectAssigment || mongoose.model('ProjectAssigment', assigmentSchema);
module.exports = ProjectAssigment;