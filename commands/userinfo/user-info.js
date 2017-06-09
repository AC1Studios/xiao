const Command = require('../../structures/Command');
const { RichEmbed } = require('discord.js');
const moment = require('moment');
const statuses = require('../../assets/json/user-info');

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'user-info',
            aliases: ['user', 'member', 'member-info'],
            group: 'userinfo',
            memberName: 'user',
            description: 'Gives some info on a user.',
            guildOnly: true,
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    key: 'member',
                    prompt: 'Which user would you like to get info on?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    }

    run(msg, args) {
        const member = args.member || msg.member;
        const status = member.user.presence.status;
        const embed = new RichEmbed()
            .setColor(statuses[status].color)
            .setThumbnail(member.user.displayAvatarURL())
            .addField('❯ Name',
                member.user.tag, true)
            .addField('❯ ID',
                member.id, true)
            .addField('❯ Discord Join Date',
                moment(member.user.createdAt).format('MMMM Do YYYY h:mm:ss A'))
            .addField('❯ Server Join Date',
                moment(member.joinedTimestamp).format('MMMM Do YYYY h:mm:ss A'))
            .addField('❯ Status',
                statuses[status].text, true)
            .addField('❯ Playing',
                member.user.presence.game ? member.user.presence.game.name : 'None', true);
        return msg.embed(embed);
    }
};
