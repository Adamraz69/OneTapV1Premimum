const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Shows bot latency and connection details.',
  execute: async (client, message) => {
    const sent = await message.channel.send({ content: '🏓 **Pinging...**' });
    const roundtrip = sent.createdTimestamp - message.createdTimestamp;
    const wsPing = Math.round(client.ws.ping);

    const embed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`> 🏓  **PONG!**\n> 🤖 **Bot Latency** — \`${roundtrip}ms\`\n> 🌐 **API Latency** — \`${wsPing}ms\`\n> 📡 **WebSocket** — \`${client.ws.status === 0 ? 'Connected' : 'Disconnected'}\`\n> ⏱ **Uptime** — <t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`)
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    await sent.edit({ content: null, embeds: [embed] });
  }
};
