const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'camon',
  description: 'Enable camera and streaming.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply({ embeds: [err('You must be in a voice channel to use this command!')] });
    }

    const channelData = tempChannels.get(voiceChannel.id);

    if (!channelData) {
      return message.reply({ embeds: [err('This is not a temporary channel!')] });
    }

    if (channelData.ownerId !== message.author.id) {
      return message.reply({ embeds: [err('You are not the owner of this channel!')] });
    }

    if (process.env.TEMP_ROOM_ROLE_ID) {
      const tempRole = message.guild.roles.cache.get(process.env.TEMP_ROOM_ROLE_ID);
      if (tempRole) {
        await voiceChannel.permissionOverwrites.edit(process.env.TEMP_ROOM_ROLE_ID, {
          Stream: true
        });
      }
    }

    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:cam_on:1519128767065227284>  *\`Camera ON\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
