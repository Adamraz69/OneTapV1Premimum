const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { setVoiceStatus } = require('../../utils/helpers');
const { getWhitelist } = require('../../utils/premiumStorage');

module.exports = {
  name: 'unlock',
  description: 'Unlock the voice channel.',
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
        [PermissionFlagsBits.Connect]: true,
        [PermissionFlagsBits.Speak]: true,
        [PermissionFlagsBits.ViewChannel]: true
      });

      const myWhitelist = await getWhitelist(message.author.id);
      const membersInChannel = voiceChannel.members;

      if (myWhitelist && myWhitelist.length > 0) {
        for (const id of myWhitelist) {
          await voiceChannel.permissionOverwrites.edit(id, {
            [PermissionFlagsBits.Connect]: true,
            [PermissionFlagsBits.ViewChannel]: true,
            [PermissionFlagsBits.Speak]: true,
            [PermissionFlagsBits.SendMessages]: true,
            [PermissionFlagsBits.ReadMessageHistory]: true
          }).catch(() => {});
        }
      }

      for (const [memberId, member] of membersInChannel) {
        if (memberId === channelData.ownerId) continue;
        if (channelData.rejectedUsers?.includes(memberId)) continue;
        if (myWhitelist?.includes(memberId)) continue;

        await voiceChannel.permissionOverwrites.edit(memberId, {
          [PermissionFlagsBits.Connect]: true,
          [PermissionFlagsBits.Speak]: true,
          [PermissionFlagsBits.ViewChannel]: true
        }).catch(() => { });
      }

      await setVoiceStatus(voiceChannel.id, client.token, '**.v help/panel**  <a:FZ_red_cross:1360451122807963770>');

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:unlock:1518717955871866900>  *\`Channel Unlocked\`*`);

      message.reply({ embeds: [successEmbed] });
    } catch (error) {
       return message.reply({ embeds: [err('Failed to unlock the channel. Please verify my permissions.')] });
    }
  }
};
