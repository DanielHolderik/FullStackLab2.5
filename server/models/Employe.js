const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
    employeId: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    email: { type: String, required: true},
    hashedPass: String,
 });

const Employe = mongoose.models.Employe || mongoose.model('Employe', employeSchema);
module.exports = Employe;

console.log("Model points to:", Employe.collection.name); //debug