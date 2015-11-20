var mongoose = require('mongoose');
var notEmpty = function(chars){
    if(chars.length === 0){return false}
    else {return true};
}
Schema = mongoose.Schema;

gachaSchema = new Schema({
    GachaName: { type: String, required:true, unique:true },
    Featured : [{ type: Schema.Types.ObjectId, ref: 'Character',required:true,validate: [notEmpty, 'Please add at least one feature in the features array'] }],
    LineUp: [{ type: Schema.Types.ObjectId, ref: 'Character',required:true,validate: [notEmpty, 'Please add at least one feature in the features array'] }],
    ImgPath: { type: String, default: "NaN" },
    Active: { type:Boolean, default: false}
},{collection: 'Gacha'}),


Gacha = mongoose.model('Gacha', gachaSchema);

module.exports = Gacha;


