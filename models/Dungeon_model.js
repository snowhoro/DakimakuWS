var mongoose = require('mongoose');
Schema = mongoose.Schema;

dungeonSchema = new Schema({
    DungeonName : { type: String, required:true, unique:true},
    //StageNumber: { type: Number, required:true },
    BackgroundImg: { type: String, default: "" },
    Stages: [{
        Characters:[{
            TeamMember:{ type: Number },
            CharacterPos: { 
                x: { type: Number },
                y: {type :Number}
            }
        }],
        Enemies:[{
            EnemyId:{ type: Schema.Types.ObjectId },
            EnemyPos: { 
                x: { type: Number },
                y: {type :Number}
            }
        }]
    }]
},{collection: 'Dungeon'}),


Dungeon = mongoose.model('Dungeon', dungeonSchema);

module.exports = Dungeon;


