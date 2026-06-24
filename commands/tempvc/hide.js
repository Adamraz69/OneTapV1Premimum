const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'hide',
  description: 'Hide the channel from the public role.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    const targetRoleId = process.env.TEMP_ROOM_ROLE_ID || message.guild.id;

    try {
      await voiceChannel.permissionOverwrites.edit(targetRoleId, { [PermissionFlagsBits.ViewChannel]: false });

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:hidden:1518719584557989998>  *\`Channel Hidden\`*`);

      message.reply({ embeds: [successEmbed] });
    } catch (error) {
      message.reply({ embeds: [err('Failed to hide the channel.')] });
    }
  }
};
