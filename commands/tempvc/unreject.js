const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unreject',
  description: 'Remove a user from the rejected list and allow joining.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply({ embeds: [err('You must be in a voice channel!')] });
    }
    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) {
      return message.reply({ embeds: [err('This is not a temporary channel!')] });
    }
    if (channelData.ownerId !== message.author.id) {
      return message.reply({ embeds: [err('You are not the owner of this channel!')] });
    }
    let targetId = null;
    const mention = message.mentions.users.first();
    if (mention) {
      targetId = mention.id;
    } else if (args[0]) {
      targetId = args[0].replace(/[^0-9]/g, '');
    }
    if (!targetId) {
      return message.reply({ embeds: [err('Please mention a user or provide a valid ID!')] });
    }
    if (!Array.isArray(channelData.rejectedUsers) || !channelData.rejectedUsers.includes(targetId)) {
      return message.reply({ embeds: [err('That user is not in the rejected list!')] });
    }
    channelData.rejectedUsers = channelData.rejectedUsers.filter(id => id !== targetId);
    try {
      await voiceChannel.permissionOverwrites.edit(targetId, { Connect: true });
    } catch {}
    const member = message.guild.members.cache.get(targetId);
    const username = member?.user?.username || targetId;
    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:reject:1519126684958457957>  *\`Unrejected <@${targetId}>\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
