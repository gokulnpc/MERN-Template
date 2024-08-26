async function getMessages(req, res) {
    const messages = [ { text: 'Hello' }, { text: 'Hi' } ];
    res.json(messages);
}

module.exports = {
    getMessages
};
