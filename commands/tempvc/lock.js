const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { setVoiceStatus } = require('../../utils/helpers');
const { getWhitelist } = require('../../utils/premiumStorage');

module.exports = {
  name: 'lock',
  description: 'Lock the voice channel.',
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
        return message.reply({ embeds: [err('This is not a registered temporary channel!')] });
    }

    if (channelData.ownerId !== message.author.id) {
        return message.reply({ embeds: [err('You are not the official owner of this channel!')] });
    }

    const targetRoleId = process.env.TEMP_ROOM_ROLE_ID || message.guild.id;

    try {
      await voiceChannel.permissionOverwrites.edit(targetRoleId, { 
          [PermissionFlagsBits.Connect]: false 
      });

      const myWhitelist = await getWhitelist(message.author.id);
      if (myWhitelist && myWhitelist.length > 0) {
          for (const id of myWhitelist) {
              await voiceChannel.permissionOverwrites.edit(id, { 
                  [PermissionFlagsBits.Connect]: true,
                  [PermissionFlagsBits.ViewChannel]: true
              }).catch(() => {});
          }
      }

      await setVoiceStatus(voiceChannel.id, client.token, '<:lock:1518716352456687697>  **Room: Locked**');

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:lock:1518716352456687697>  *\`Channel Locked\`*`);

      message.reply({ embeds: [successEmbed] });
    } catch (error) {
       return message.reply({ embeds: [err('Failed to lock the channel. Please verify my permissions.')] });
    }
  }
};
