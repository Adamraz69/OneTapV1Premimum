const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'reject',
  description: 'Block a specific user from joining your temp channel.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const mentionUser = message.mentions.users.first();
    let targetId = mentionUser?.id ?? (args[0] ? args[0].replace(/[^0-9]/g, '') : null);
    if (!targetId) return message.reply({ embeds: [err('Please mention a user or provide a valid ID!')] });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    if (targetId === message.author.id) return message.reply({ embeds: [err('You cannot reject yourself!')] });

    const targetMember = await message.guild.members.fetch(targetId).catch(() => null);
    if (!targetMember) return message.reply({ embeds: [err('Could not find that user in the server!')] });
    if (targetMember.user.bot) return message.reply({ embeds: [err('You cannot reject a bot!')] });

    if (targetMember.voice.channelId !== voiceChannel.id) {
      return message.reply({ embeds: [err('That user is not in your voice channel!')] });
    }

    if (!channelData.rejectedUsers) channelData.rejectedUsers = [];
    if (!channelData.allowedUsers) channelData.allowedUsers = [];

    if (channelData.rejectedUsers.includes(targetId)) {
      return message.reply({ embeds: [err('That user is already rejected!')] });
    }

    channelData.rejectedUsers.push(targetId);
    channelData.allowedUsers = channelData.allowedUsers.filter(id => id !== targetId);

    await voiceChannel.permissionOverwrites.edit(targetId, { Connect: false });

    if (channelData.textChannelId) {
      const txtChan = client.channels.cache.get(channelData.textChannelId);
      if (txtChan) {
        await txtChan.permissionOverwrites.delete(targetId).catch(() => {});
      }
    }

    const toxicChannelId = process.env.TOXIC;
    const toxicChannel = toxicChannelId ? client.channels.cache.get(toxicChannelId) : null;
    if (toxicChannel) await targetMember.voice.setChannel(toxicChannel).catch(() => { });

    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:reject:1519126684958457957>  *\`Rejected <@${targetId}>\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
