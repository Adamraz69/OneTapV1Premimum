const { EmbedBuilder } = require('discord.js');
const { safeReply } = require('../../utils/helpers');

const MAX_NAME_LENGTH = 90;

module.exports = {
  name: 'name',
  description: 'Change channel name.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    if (args.length === 0) return message.reply({ embeds: [err('Please provide a new valid name!')] });

    const rawName = args.join(' ');

    if (rawName.length > MAX_NAME_LENGTH) {
      return message.reply({ embeds: [err(`Channel name is too long! Maximum is ${MAX_NAME_LENGTH} characters.`)] });
    }

    const newName = `🔊｜${rawName}`;
    const oldName = voiceChannel.name;

    try {
      await voiceChannel.setName(newName);

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:editing:1518718647651139657>  *\`Renamed → ${newName}\`*`);

      safeReply(message, { embeds: [successEmbed] });
    } catch (error) {
      safeReply(message, { embeds: [err('Failed to change name. It might be rate limited — try again in a moment.')] });
    }
  }
};
