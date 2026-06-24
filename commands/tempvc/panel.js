const { EmbedBuilder, PermissionFlagsBits, Routes, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'panel',
  description: 'Show the professional channel control panel V2.',
  execute: async (client, message, args, tempChannels) => {
    const voiceChannel = message.member.voice.channel;

    const sendError = (msg) => {
      const errorEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`>  <a:warning_animated:1361729714259099809> __**\`${msg}\`**__`);
      return message.reply({ embeds: [errorEmbed] });
    };

    if (!voiceChannel) return sendError('You must be in a voice channel!');
    const channelData = tempChannels.get(voiceChannel.id);
    if (!channelData) return sendError('This is not a temporary channel!');
    if (channelData.ownerId !== message.author.id) return sendError('Only the owner can use the panel!');

    const displayName = message.member.displayName;

    const row1 = new ButtonBuilder().setCustomId('panel_lock').setLabel('LOCK').setEmoji('<:lock:1518716352456687697>').setStyle(ButtonStyle.Secondary).toJSON();
    const row1b = new ButtonBuilder().setCustomId('panel_unlock').setLabel('UNLOCK').setEmoji('<:unlock:1518717955871866900>').setStyle(ButtonStyle.Secondary).toJSON();
    const row1c = new ButtonBuilder().setCustomId('panel_hide').setLabel('HIDE').setEmoji('<:hidden:1518719584557989998>').setStyle(ButtonStyle.Secondary).toJSON();
    const row1d = new ButtonBuilder().setCustomId('panel_unhide').setLabel('UNHIDE').setEmoji('<:hidden:1518719584557989998>').setStyle(ButtonStyle.Secondary).toJSON();
    const row1e = new ButtonBuilder().setCustomId('panel_limit').setLabel('LIMIT').setEmoji('<:limited:1518719076464070848>').setStyle(ButtonStyle.Secondary).toJSON();

    const row2a = new ButtonBuilder().setCustomId('panel_rename').setLabel('RENAME').setEmoji('<:editing:1518718647651139657>').setStyle(ButtonStyle.Secondary).toJSON();
    const row2b = new ButtonBuilder().setCustomId('panel_kick').setLabel('KICK').setEmoji('<:kick:1518720896502731063>').setStyle(ButtonStyle.Danger).toJSON();
    const row2c = new ButtonBuilder().setCustomId('panel_transfer').setLabel('TRANSFER').setEmoji('<a:org:1449141144268308595>').setStyle(ButtonStyle.Secondary).toJSON();
    const row2d = new ButtonBuilder().setCustomId('panel_claim').setLabel('CLAIM').setEmoji('<:claim:1519125614790049975>').setStyle(ButtonStyle.Secondary).toJSON();
    const row2e = new ButtonBuilder().setCustomId('panel_delete').setLabel('DELETE').setEmoji('<:delete:1518723074231632034>').setStyle(ButtonStyle.Danger).toJSON();

    const row3a = new ButtonBuilder().setCustomId('panel_invite').setLabel('INVITE').setEmoji('<:invite:1519126235345588244>').setStyle(ButtonStyle.Secondary).toJSON();
    const row3b = new ButtonBuilder().setCustomId('panel_permit').setLabel('PERMIT').setEmoji('<:permit:1519126533975965797>').setStyle(ButtonStyle.Secondary).toJSON();
    const row3c = new ButtonBuilder().setCustomId('panel_reject').setLabel('REJECT').setEmoji('<:reject:1519126684958457957>').setStyle(ButtonStyle.Danger).toJSON();
    const row3d = new ButtonBuilder().setCustomId('panel_permitrole').setLabel('PERMIT ROLE').setEmoji('<:permit_role:1519127059044106300>').setStyle(ButtonStyle.Secondary).toJSON();
    const row3e = new ButtonBuilder().setCustomId('panel_rejectrole').setLabel('REJECT ROLE').setEmoji('<:reject_role:1519127329857605642>').setStyle(ButtonStyle.Danger).toJSON();

    const row4a = new ButtonBuilder().setCustomId('panel_sbon').setLabel('SB ON').setEmoji('<:soundboard_on:1519128003408429186>').setStyle(ButtonStyle.Secondary).toJSON();
    const row4b = new ButtonBuilder().setCustomId('panel_sboff').setLabel('SB OFF').setEmoji('<:soundboard_off:1519128206429388970>').setStyle(ButtonStyle.Danger).toJSON();
    const row4c = new ButtonBuilder().setCustomId('panel_camon').setLabel('CAM ON').setEmoji('<:cam_on:1519128767065227284>').setStyle(ButtonStyle.Secondary).toJSON();
    const row4d = new ButtonBuilder().setCustomId('panel_camoff').setLabel('CAM OFF').setEmoji('<:cam_off:1519128975664873663>').setStyle(ButtonStyle.Danger).toJSON();
    const row4e = new ButtonBuilder().setCustomId('panel_activity').setLabel('ACTIVITY').setEmoji('<:activity:1519129435536752850>').setStyle(ButtonStyle.Secondary).toJSON();

    const row5a = new ButtonBuilder().setCustomId('panel_owner').setLabel('OWNER').setEmoji('<:claim:1519125614790049975>').setStyle(ButtonStyle.Secondary).toJSON();
    const row5b = new ButtonBuilder().setCustomId('panel_status').setLabel('STATUS').setEmoji('<:status:1519129675236905041>').setStyle(ButtonStyle.Secondary).toJSON();
    const row5c = new ButtonBuilder().setCustomId('panel_vcinfo').setLabel('VC INFO').setEmoji('<:voice2:1358152471687467228>').setStyle(ButtonStyle.Secondary).toJSON();
    const row5d = new ButtonBuilder().setCustomId('panel_info').setLabel('INFO').setEmoji('<:voice2:1358152471687467228>').setStyle(ButtonStyle.Secondary).toJSON();

    const payload = {
      flags: 32768,
      components: [
        {
          type: 17,
          accent_color: 2829617,
          components: [
            {
              type: 10,
              content: `## 🎉 **Control Panel — ${displayName}**`
            },
            {
              type: 14
            },
            {
              type: 1,
              components: [row1, row1b, row1c, row1d, row1e]
            },
            {
              type: 1,
              components: [row2a, row2b, row2c, row2d, row2e]
            },
            {
              type: 1,
              components: [row3a, row3b, row3c, row3d, row3e]
            },
            {
              type: 1,
              components: [row4a, row4b, row4c, row4d, row4e]
            },
            {
              type: 1,
              components: [row5a, row5b, row5c, row5d]
            },
            {
              type: 14
            },
            {
              type: 1,
              components: [
                { type: 2, style: 5, label: "report person/issue", url: "https://discord.com/channels/1201626435958354021/1352049837742231573" }
              ]
            },
            {
              type: 10,
              content: "Wisdom TMPV • Use `.v help` for more commands"
            }
          ]
        }
      ]
    };

    try {
      await message.delete().catch(() => { });
      await client.rest.post(Routes.channelMessages(message.channelId), { body: payload });
    } catch (error) {
      console.error('Error sending V2 Panel:', error);
    }
  }
};
