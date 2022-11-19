// Chargement du fichier .env
require('dotenv').config();

// Chargement sur serveur HTTP
exports.http = require('http');

exports.TOKEN=process.env.BOT_TOKEN;//clé du boot discord
