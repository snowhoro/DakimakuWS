var mongoose = require('mongoose');

Schema = mongoose.Schema;

inventorySchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: 'Account',required: true ,unique:true },
    Characters : [{
        PlayerChar: {
            MaxChar: { type: Schema.Types.ObjectId, ref: 'Character' },
            Level: { type: Number, default: 1},
            Experience: { type: Number, default: 0},
            HP: {type: Number,default: 1},
            MagicAttack: { type: Number, default: 1},
            MagicDefense: { type: Number, default: 1},
            SpecMagicAttack: { type: Number, default: 1},
            SpecMagicDefense: { type: Number, default: 1},
            PhysicalAttack: { type: Number, default:1},
            SpecPhysicalAttack: { type: Number, default:1},
            PhysicalDefense: { type: Number, default:1},
            SpecPhysicalDefense: { type: Number, default:1}
        }
    }]
},{collection: 'Inventory'}),



Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;