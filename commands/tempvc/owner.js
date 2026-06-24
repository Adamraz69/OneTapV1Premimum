const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'owner',
  description: 'Show the current owner of the temp channel.',
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

    try {
      const owner = await client.users.fetch(channelData.ownerId);
      const member = message.guild.members.cache.get(channelData.ownerId);
      
      const ownerEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setTitle('<a:12104crownpink:1449139449211387945> مالك القناة')
        .setDescription('معلومات مالك القناة المؤقتة الحالي')
        .addFields(
          { name: '👤 اسم المستخدم', value: owner.username, inline: true },
          { name: '🏷️ العرض', value: member ? member.displayName : owner.username, inline: true },
          { name: '🆔 المعرف', value: owner.id, inline: true },
          { name: '🎤 القناة', value: voiceChannel.name, inline: false },
          { name: '📅 تاريخ الإنشاء', value: `<t:${Math.floor(owner.createdTimestamp / 1000)}:F>`, inline: false }
        )
        .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Wisdom TMPV - S Version ©', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();
      
      message.reply({ embeds: [ownerEmbed] });
    } catch (error) {
      console.error('Error fetching owner:', error);
      
      const errorEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`Failed to fetch owner information!\`**__`);
      
      message.reply({ embeds: [errorEmbed] });
    }
  }
};
