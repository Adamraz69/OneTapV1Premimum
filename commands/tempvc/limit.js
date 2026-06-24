const { EmbedBuilder } = require('discord.js');
const { safeReply } = require('../../utils/helpers');

module.exports = {
  name: 'limit',
  description: 'Set user limit for the voice channel.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const limit = parseInt(args[0], 10);
    if (isNaN(limit) || limit < 0 || limit > 99) {
      return message.reply({ embeds: [err('Please provide a valid number (0-99)!')] });
    }

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    try {
      await voiceChannel.setUserLimit(limit);

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:limited:1518719076464070848>  *\`Limit → ${limit}\`*`);

      safeReply(message, { embeds: [successEmbed] });
    } catch (error) {
      safeReply(message, { embeds: [err('Failed to update limit. Rate limit might apply.')] });
    }
  }
};
