const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/quotes', { useNewUrlParser: true, useUnifiedTopology: true });

const quoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

const Quote = mongoose.model('Quote', quoteSchema);

app.get('/api/quote', async (req, res) => {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

app.get('/api/quotes/:author', async (req, res) => {
    const author = req.params.author;
    try {
        let quotes = await Quote.find({ author: new RegExp(author, 'i') });

        if (quotes.length === 0) {
            // Fetch from external API if no quotes found in MongoDB
            const response = await axios.get(`https://api.quotable.io/quotes?author=${author}`);
            quotes = response.data.results.map(quote => ({
                text: quote.content,
                author: quote.author
            }));
        }

        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
