const { EmbedBuilder } = require('discord.js');
const { isPremiumMember } = require('../../utils/premiumStorage');

module.exports = {
  name: 'claim',
  description: 'Claim ownership if the current owner left.',
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

    let ownerPremium = channelData.isPremium || null;
    if (!ownerPremium && channelData.ownerId) {
      ownerPremium = await isPremiumMember(channelData.ownerId);
    }
    if (ownerPremium) {
      return message.reply({ embeds: [err('You cannot claim this room! It is fully shielded by **WS TMPV Premium** immunity.')] });
    }

    if (channelData.ownerId === message.author.id) {
      return message.reply({ embeds: [err('You are already the owner of this channel!')] });
    }

    if (voiceChannel.members.has(channelData.ownerId)) {
      return message.reply({ embeds: [err('The current owner is still in the channel!')] });
    }

    if (channelData.ownerLeftAt) {
      const remainingSeconds = Math.floor((300000 - (Date.now() - channelData.ownerLeftAt)) / 1000);
      if (remainingSeconds > 0) {
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return message.reply({ embeds: [err(`The owner recently left. You must wait for the 5-minute grace period before claiming ownership.\n**Remaining:** ${remainingMinutes}m ${seconds}s`)] });
      }
    }

    await voiceChannel.permissionOverwrites.edit(message.author.id, {
      Connect: true,
      ViewChannel: true,
      Stream: true,
      Speak: true,
      UseVAD: true,
      PrioritySpeaker: true
    });

    const oldOwnerId = channelData.ownerId;
    await voiceChannel.permissionOverwrites.edit(oldOwnerId, {
      ManageChannels: false,
      PrioritySpeaker: false
    }).catch(() => { });

    channelData.ownerId = message.author.id;
    delete channelData.ownerLeftAt;

    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:claim:1519125614790049975>  *\`Channel Claimed\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
