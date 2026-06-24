const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'permit',
  description: 'Allow a specific user to join your temp channel.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const user = message.mentions.users.first();
    if (!user) return message.reply({ embeds: [err('Please mention a user to permit!')] });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    if (user.id === message.author.id) return message.reply({ embeds: [err('You are already the owner!')] });

    if (channelData.rejectedUsers?.includes(user.id)) {
      channelData.rejectedUsers = channelData.rejectedUsers.filter(id => id !== user.id);
    }

    if (!channelData.allowedUsers) channelData.allowedUsers = [];
    if (!channelData.allowedUsers.includes(user.id)) {
      channelData.allowedUsers.push(user.id);
    }

    try {
      await voiceChannel.permissionOverwrites.edit(user.id, {
        [PermissionFlagsBits.Connect]: true,
        [PermissionFlagsBits.ViewChannel]: true,
        [PermissionFlagsBits.Speak]: true
      });

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:permit:1519126533975965797>  *\`Permitted <@${user.id}>\`*`);

      message.reply({ embeds: [successEmbed] });
    } catch (error) {
      message.reply({ embeds: [err('Failed to permit user. Check bot permissions.')] });
    }
  }
};
