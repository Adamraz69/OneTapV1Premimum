const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a user from your temp voice channel (can rejoin later).',
  execute: async (client, message, args, tempChannels) => {
    const err = (msg) => new EmbedBuilder()
      .setColor(0x2B2D31)
      .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ embeds: [err('You must be in a voice channel!')] });

    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return message.reply({ embeds: [err('This is not a temporary channel!')] });
    if (channelData.ownerId !== message.author.id) return message.reply({ embeds: [err('You are not the owner of this channel!')] });

    const mentionUser = message.mentions.users.first();
    let targetId = mentionUser?.id ?? (args[0] ? args[0].replace(/[^0-9]/g, '') : null);

    if (!targetId) {
      return message.reply({ embeds: [err('Please mention a user or provide a valid ID to kick!')] });
    }

    if (targetId === message.author.id) {
      return message.reply({ embeds: [err('You cannot kick yourself!')] });
    }

    const targetMember = voiceChannel.members.get(targetId);
    if (!targetMember) {
      return message.reply({ embeds: [err('That user is not in your voice channel!')] });
    }

    if (targetMember.user.bot) {
      return message.reply({ embeds: [err('You cannot kick a bot!')] });
    }

    try {
      if (typeof targetMember.voice.disconnect === 'function') {
        await targetMember.voice.disconnect();
      } else {
        const createRoomId = process.env.CREATE_ROOM_ID;
        const createRoom = message.guild.channels.cache.find(
          c => c.id === createRoomId || (c.type === 2 && (c.name.includes('Create Room') || c.name.includes('➕')))
        );

        await targetMember.voice.setChannel(createRoom ?? null);
      }

      if (channelData.allowedUsers) {
        channelData.allowedUsers = channelData.allowedUsers.filter(id => id !== targetId);
      }

      const successEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`<:kick:1518720896502731063>  *\`Kicked <@${targetId}>\`*`);

      message.reply({ embeds: [successEmbed] });

    } catch (error) {
      return message.reply({ embeds: [err('Failed to kick the user. Make sure I have Move Members permission.')] });
    }
  }
};
