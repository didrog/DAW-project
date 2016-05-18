var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usuariosSchema = new Schema({
    nombre: { type: String },
    mail: { type: String , unique: true},
    pwd: { type: String},
    idFavorito: { type: Number},
    token: {type: String}
});

module.exports = mongoose.model('Usuarios', usuariosSchema);
