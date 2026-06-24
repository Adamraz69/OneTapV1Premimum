const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'permitrole',
  description: 'Allow a specific role to join your temp channel.',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const role = message.mentions.roles.first();
    if (!role) return message.reply({ embeds: [err('Please mention a role to permit!')] });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });

    const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID;
    const isOwner = channelData.ownerId === message.author.id;
    const isAdmin = ADMIN_ROLE_ID && message.member.roles.cache.has(ADMIN_ROLE_ID);

    if (!isOwner && !isAdmin) {
      return message.reply({ embeds: [err('You are not the owner or an admin!')] });
    }

    try {
      await voiceChannel.permissionOverwrites.edit(role.id, {
        [PermissionFlagsBits.Connect]: true,
        [PermissionFlagsBits.ViewChannel]: true
      });

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:permit_role:1519127059044106300>  *\`Permitted <@&${role.id}>\`*`);

      message.reply({ embeds: [successEmbed] });
    } catch (error) {
      message.reply({ embeds: [err('Failed to permit role.')] });
    }
  }
};
