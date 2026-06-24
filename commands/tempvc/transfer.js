const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'transfer',
  description: 'Transfer channel ownership to another user.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply({ embeds: [err('Please mention a user to transfer ownership to!')] });
    }

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    if (user.id === message.author.id) {
      return message.reply({ embeds: [err('You cannot transfer ownership to yourself!')] });
    }

    if (user.bot) {
      return message.reply({ embeds: [err('You cannot transfer ownership to a bot!')] });
    }

    const targetMember = voiceChannel.members.get(user.id);
    if (!targetMember) {
      return message.reply({ embeds: [err('The target user must be in your voice channel!')] });
    }

    await voiceChannel.permissionOverwrites.edit(user.id, {
      Connect: true,
      ViewChannel: true,
      Stream: true,
      Speak: true,
      UseVAD: true,
      PrioritySpeaker: true
    });

    await voiceChannel.permissionOverwrites.edit(message.author.id, {
      ManageChannels: false,
      PrioritySpeaker: false
    });

    channelData.ownerId = user.id;

    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<a:org:1449141144268308595>  *\`Transferred to ${user.id}\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
