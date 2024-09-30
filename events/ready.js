const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');

var config = require('../config.json');
const mongoURL = config.MONGOURL

module.exports = {
    name: 'ready', 
    once: true,
    async execute(client) { 
        client.user.setActivity({
            name: 'Hi',
            type: ActivityType.Custom,
         //   url: 'https://www.twitch.tv/discord'
        });
    },
};

