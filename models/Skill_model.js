var mongoose = require('mongoose');
Schema = mongoose.Schema;

skillSchema = new Schema({
    SkillName : { type : String, unique: true, required:true }
},{collection: 'Skill'}),


Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;