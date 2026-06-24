const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'sboff',
  description: 'Disable soundboard.',
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
          UseSoundboard: false
        });
      }
    }
    
    const successEmbed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`<:soundboard_off:1519128206429388970>  *\`Soundboard OFF\`*`);

    message.reply({ embeds: [successEmbed] });
  }
};
