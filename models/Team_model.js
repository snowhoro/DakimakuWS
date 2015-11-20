var mongoose = require('mongoose');
Schema = mongoose.Schema;

teamSchema = new Schema({
    User :  { type: Schema.Types.ObjectId, ref: 'Account',required: true ,unique:true },
    Teams : {  
        team_1:[Schema.Types.ObjectId],  
        team_2:[Schema.Types.ObjectId],
        team_3:[Schema.Types.ObjectId],
        team_4:[Schema.Types.ObjectId],
        team_5:[Schema.Types.ObjectId],
    }
},{collection: 'Team'}),


Team = mongoose.model('Team', teamSchema);

module.exports = Team;