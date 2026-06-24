const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'Invite a user to your temp channel.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply({ embeds: [err('Please mention a user to invite!')] });
    }

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    if (user.id === message.author.id) {
      return message.reply({ embeds: [err('You cannot invite yourself!')] });
    }

    if (user.bot) {
      return message.reply({ embeds: [err('You cannot invite a bot!')] });
    }

    if (!channelData.allowedUsers) channelData.allowedUsers = [];

    if (channelData.allowedUsers.includes(user.id)) {
      return message.reply({ embeds: [err('This user is already invited!')] });
    }

    if (channelData.rejectedUsers?.includes(user.id)) {
      channelData.rejectedUsers = channelData.rejectedUsers.filter(id => id !== user.id);
    }

    channelData.allowedUsers.push(user.id);
    await voiceChannel.permissionOverwrites.edit(user.id, {
      Connect: true,
      ViewChannel: true,
      Speak: true,
      SendMessages: true,
      ReadMessageHistory: true,
      UseVAD: true
    });

    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:invite:1519126235345588244>  *\`Invited <@${user.id}>\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
