var mongoose = require('mongoose');
Schema = mongoose.Schema;

accountSchema = new Schema({
  PlayerName : { type: String , required: true },
  Experience : { type: Number, default: 0},
  Level : { type: Number, default: 0},
  Stamina : {type: Number, default: 20},
  SoftCurrency : {type: Number, default: 0},
  HardCurrency : {type: Number, default: 0},
  LogDays : {type: Number, default: 1},
  TotalLogDays : {type: Number, default: 1},
  FriendPoints : {type: Number, default: 0}
},{collection: 'Account'}),


Account = mongoose.model('Account', accountSchema);

module.exports = Account;