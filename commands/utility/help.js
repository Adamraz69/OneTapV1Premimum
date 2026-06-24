const { Routes } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Show help information in the current channel.',
  execute: async (client, message) => {
    const payload = {
      flags: 32768,
      components: [
        {
          type: 17,
          accent_color: 2829617,
          components: [
            {
              type: 10,
              content: `## 📚 **WISDOM HELP CENTER**\n\n> <a:boost:1449497847094444083> **Your Voice Control Center**\n> Prefix: \`.v\`  •  Use commands inside your room`
            },
            {
              type: 14
            },
            {
              type: 10,
              content: `### <:lock:1518716352456687697> **Security**\n\`lock\` / \`unlock\` — toggle join permission\n\`hide\` / \`unhide\` — toggle visibility\n\`limit <n>\` — set member cap`
            },
            {
              type: 10,
              content: `### <:editing:1518718647651139657> **Management**\n\`name <text>\` — rename room\n\`transfer @user\` — transfer ownership\n\`claim\` — claim empty room\n\`delete\` — delete room`
            },
            {
              type: 10,
              content: `### <:invite:1519126235345588244> **Access**\n\`invite @user\` — invite to room\n\`permit @user\` — allow access\n\`reject @user\` — block access\n\`permit-role <role>\` / \`reject-role <role>\` — role access`
            },
            {
              type: 10,
              content: `### <:soundboard_on:1519128003408429186> **Toggles**\n\`sb-on\` / \`sb-off\` — soundboard\n\`cam-on\` / \`cam-off\` — camera/stream\n\`activity\` — toggle activities`
            },
            {
              type: 10,
              content: `### <:status:1519129675236905041> **Info**\n\`owner\` — show channel owner\n\`status <text>\` — set voice status\n\`vcinfo\` — room information\n\`panel\` — control panel (buttons)`
            },
            {
              type: 14
            },
            {
              type: 10,
              content: `### 👑 **WS TMPV Premium**\n\`myoffer\` — perks & expiry\n\`phelp\` — premium help\n\`whitelist @user\` — permanent access\n\`unwhitelist @user\` — remove access\n\`whitelistlist\` — view whitelist\n\`safehouse\` / \`sh\` — anti-abuse`
            },
            {
              type: 1,
              components: [
                { type: 2, style: 5, label: "report person/issue", url: "https://discord.com/channels/1201626435958354021/1352049837742231573" }
              ]
            },
            {
              type: 10,
              content: `Wisdom TMPV - S Version © • Use \`.v phelp\` for Premium`
            }
          ]
        }
      ]
    };

    try {
      await message.delete().catch(() => {});
      await client.rest.post(Routes.channelMessages(message.channelId), { body: payload });
    } catch (error) {
      console.error('Error sending help V2:', error);
    }
  }
};
