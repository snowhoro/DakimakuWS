var mongoose = require('mongoose');
Schema = mongoose.Schema;

gachaSchema = new Schema({
    Featured : [{ type: Schema.Types.ObjectId, ref: 'Character',required:true }],
    LineUp: [{ type: Schema.Types.ObjectId, ref: 'Character',required:true }],
    ImgPath: { type: String, default: "NaN" },
    Active: { type:Boolean, default: false}
},{collection: 'Gacha'}),


Gacha = mongoose.model('Gacha', gachaSchema);

module.exports = Gacha;