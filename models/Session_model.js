var mongoose = require('mongoose');
Schema = mongoose.Schema;

sessionSchema = new Schema({
    User :  { type: Schema.Types.ObjectId, ref: 'Account',required: true ,unique:true },
    LastLog : {type: Date, default: Date.now(),required:true},
    CurrentStamina : {type: Number,default:10, required:true},
    StaminaTimer: { type: Date, default: Date.now() }
},{collection: 'Session'}),


Session = mongoose.model('Session', sessionSchema);

module.exports = Session;