var mongoose = require('mongoose');
Schema = mongoose.Schema;

enemySchema = new Schema({
    Name : { type : String, unique: true, required:true },
    HP : { type : Number, default : 100},
    MagicAttack : { type : Number, default : 0},
    MagicDefense : { type : Number, default : 0},
    PhysicalAttack : { type : Number, default : 0},
    PhysicalDefense : { type : Number, default : 0},
    Attribute : { type : String, default : "NaN"},
    Sprite : { type:String , default:"NaN"},
    Portrait: { type: String, default:"NaN"},
    Turns: {type: Number, default : 1},
    Skills: [{type: Schema.Types.ObjectId,ref: "Skill"}]
},{collection: 'Enemy'}),


Enemy = mongoose.model('Enemy', enemySchema);

module.exports = Enemy;