const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String},
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
module.exports = Project;