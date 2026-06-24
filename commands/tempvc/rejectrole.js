const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'rejectrole',
  description: 'Block a specific role from joining your temp channel.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const role = message.mentions.roles.first();
    if (!role) return message.reply({ embeds: [err('Please mention a role to reject!')] });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });

    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    try {
      await voiceChannel.permissionOverwrites.edit(role.id, {
        [PermissionFlagsBits.Connect]: false
      });

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:reject_role:1519127329857605642>  *\`Rejected <@&${role.id}>\`*`);

      message.reply({ embeds: [successEmbed] });
    } catch (error) {
      message.reply({ embeds: [err('Failed to reject role.')] });
    }
  }
};
