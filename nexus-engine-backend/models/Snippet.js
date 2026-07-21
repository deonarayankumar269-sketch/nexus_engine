const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    branch: { type: String, default: 'main@origin' },
    code: { type: String, required: true },
    commitHash: { type: String, required: true },
    author: { type: String, default: 'Deonarayan' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Snippet', SnippetSchema);