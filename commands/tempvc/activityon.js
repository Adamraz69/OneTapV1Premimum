const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'activityon',
  description: 'Enable activities like Watch Together.',
  execute: async (client, message) => {
    const voiceChannel = message.member.voice.channel;
    
    if (!voiceChannel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`You must be in a voice channel to use this command!\`**__`);
      return message.reply({ embeds: [errorEmbed] });
    }
    
    if (process.env.TEMP_ROOM_ROLE_ID) {
      const tempRole = message.guild.roles.cache.get(process.env.TEMP_ROOM_ROLE_ID);
      if (tempRole) {
        await voiceChannel.permissionOverwrites.edit(process.env.TEMP_ROOM_ROLE_ID, {
          UseEmbeddedActivities: true
        });
      }
    }
    
    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:activity:1519129435536752850>  *\`Activities ON\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
