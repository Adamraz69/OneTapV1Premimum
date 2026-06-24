const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'sendchat',
  description: 'Toggle chat permissions for temp room role.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });

    if (channelData.ownerId !== message.author.id) {
      return message.reply({ embeds: [err('You are not the owner of this channel!')] });
    }

    if (!process.env.TEMP_ROOM_ROLE_ID) {
      return message.reply({ embeds: [err('Temp room role is not configured!')] });
    }

    const tempRole = message.guild.roles.cache.get(process.env.TEMP_ROOM_ROLE_ID);
    if (!tempRole) return message.reply({ embeds: [err('Temp room role not found!')] });

    try {
      const currentPerms = voiceChannel.permissionOverwrites.cache.get(process.env.TEMP_ROOM_ROLE_ID);
      const canSend = currentPerms?.allow?.has(PermissionFlagsBits.SendMessages) ||
        (!currentPerms?.deny?.has(PermissionFlagsBits.SendMessages) && !currentPerms);

      if (canSend) {
        await voiceChannel.permissionOverwrites.edit(process.env.TEMP_ROOM_ROLE_ID, { SendMessages: false });
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(0x2B2D31)
              .setTitle('<:lock:1518716352456687697> Chat Locked')
              .setDescription(`Chat has been **locked** for ${tempRole.name}.`)
              .setFooter({ text: 'Wisdom TMPV - S Version ©', iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
          ]
        });
      } else {
        await voiceChannel.permissionOverwrites.edit(process.env.TEMP_ROOM_ROLE_ID, { SendMessages: true });
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(0x2B2D31)
              .setTitle('<:unlock:1518717955871866900> Chat Unlocked')
              .setDescription(`Chat has been **unlocked** for ${tempRole.name}.`)
              .setFooter({ text: 'Wisdom TMPV - S Version ©', iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
          ]
        });
      }
    } catch (error) {
      message.reply({ embeds: [err('An error occurred while toggling chat permissions!')] });
    }
  },
};
