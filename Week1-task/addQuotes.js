const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quotes', { useNewUrlParser: true, useUnifiedTopology: true });

const quoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

const Quote = mongoose.model('Quote', quoteSchema);

const quotes = [
    { text: 'Be yourself; everyone else is already taken.', author: 'Oscar Wilde' },
    { text: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.', author: 'Albert Einstein' },
    { text: 'So many books, so little time.', author: 'Frank Zappa' },
    { text: 'A room without books is like a body without a soul.', author: 'Marcus Tullius Cicero' },
    { text: 'In three words I can sum up everything I\'ve learned about life: it goes on.', author: 'Robert Frost' },
    { text: 'If you tell the truth, you don\'t have to remember anything.', author: 'Mark Twain' },
    { text: 'A friend is someone who knows all about you and still loves you.', author: 'Elbert Hubbard' },
    { text: 'To live is the rarest thing in the world. Most people exist, that is all.', author: 'Oscar Wilde' },
    { text: 'Without music, life would be a mistake.', author: 'Friedrich Nietzsche' },
    { text: 'We accept the love we think we deserve.', author: 'Stephen Chbosky' },
];

Quote.insertMany(quotes)
    .then(() => {
        console.log('Quotes added successfully');
        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Failed to add quotes', error);
    });
