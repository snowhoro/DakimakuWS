var mongoose = require('mongoose');
Schema = mongoose.Schema;

teamSchema = new Schema({
    User :  { type: Schema.Types.ObjectId, ref: 'Account',required: true ,unique:true },
    StaminaTimer: { type: Date, default: Date.now() }
},{collection: 'Teams'}),


Session = mongoose.model('Team', teamSchema);

module.exports = Team;