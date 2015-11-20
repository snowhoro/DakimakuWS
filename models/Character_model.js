var mongoose = require('mongoose');
Schema = mongoose.Schema;

characterSchema = new Schema({
    Name : { type : String, unique: true, required:true },
    Rarity: { type: Number, default: 1, max: 6},
    CurveId: { type: Schema.Types.ObjectId, ref: 'CharacterCurves'},
    MaxHP : { type : Number, default : 100},
    MaxMagicAttack : { type : Number, default : 0},
    MaxMagicDefense : { type : Number, default : 0},
    MaxPhysicalAttack : { type : Number, default : 0},
    MaxPhysicalDefense : { type : Number, default : 0},
    Attribute : { type : String, default : "NaN"},
    Sprite : { type:String , default:"NaN"},
    Portrait: { type: String, default:"NaN"},
    Skills: [{type: Schema.Types.ObjectId,ref: "Skill"}]
},{collection: 'Character'}),


Character = mongoose.model('Character', characterSchema);

module.exports = Character;