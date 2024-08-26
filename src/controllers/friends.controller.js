const path = require('path');
async function getFriends(req, res) {
    const friends = [ { name: 'Alice' }, { name: 'Bob' } ];
    res.json(friends);
}

async function getBale(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'bale.jpg'));
}

module.exports = {
    getFriends,
    getBale
};