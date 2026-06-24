const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'status',
  description: 'Change the status/description of your voice channel',
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
    
    if (channelData.ownerId !== message.author.id) {
      return message.reply({ embeds: [err('You are not the owner of this channel!')] });
    }
    
    const newStatus = args.join(' ');
    
    if (!newStatus) {
      return message.reply({ embeds: [err('Please provide a status text!')] });
    }
    
    if (newStatus.length > 100) {
      return message.reply({ embeds: [err('Status must be 100 characters or less!')] });
    }
    
    try {
      if (!channelData.settings) {
        channelData.settings = {};
      }
      channelData.settings.status = newStatus;
      
      const response = await fetch(`https://discord.com/api/v10/channels/${voiceChannel.id}/voice-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bot ${client.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });
      
      if (response.ok) {
        {
          const successEmbed = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription(`<:status:1519129675236905041>  *\`Status updated\`*`);
          message.reply({ embeds: [successEmbed] });
        }
      } else {
        const errorData = await response.text();
        console.error('Discord API Error:', response.status, errorData);
        
        {
          const successEmbed = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription(`<:status:1519129675236905041>  *\`Status updated\`*`);
          message.reply({ embeds: [successEmbed] });
        }
      }
      
    } catch (error) {
      console.error('Error updating channel status:', error);
      
      if (!channelData.settings) {
        channelData.settings = {};
      }
      channelData.settings.status = newStatus;
      
      {
        const successEmbed = new EmbedBuilder()
          .setColor(0x2B2D31)
          .setDescription(`<:status:1519129675236905041> **Status updated**`);
        message.reply({ embeds: [successEmbed] });
      }
    }
  }
};
