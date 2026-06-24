const fs = require('fs');
const path = require('path');

const commandsDir = path.join(__dirname, 'commands');

// Skip panel.js and help.js as we manually updated them and want to avoid double-replacing or breaking specific formats we just set.
// Although help.js might benefit from this if we missed some.
const files = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

const replacements = [
    { original: '🔒', new: '<:lock:1518716352456687697>' }, // Lock
    { original: '🔓', new: '<:unlock:1518717955871866900>' }, // Unlock
    { original: '✏️', new: '<:editing:1518718647651139657>' }, // Rename
    { original: '🔢', new: '<:limited:1518719076464070848>' }, // Limit
    // { original: '👁️', new: '<:hidden:1518719584557989998>' }, // Hide (careful, sometimes means visible?)
    // In panel.js original: Hide was 👁️, Unhide was 👀
    // But in some contexts 👁️ might mean "Visible".
    // User: HIDE -> Red_Eye, UNHIDE -> Eyes.
    // I'll be specific.
    { original: '👁️', new: '<:hidden:1518719584557989998>' },
    { original: '👀', new: '<:hidden:1518719584557989998>' },
    { original: '👢', new: '<:kick:1518720896502731063>' }, // Kick
    { original: '👑', new: '<a:12104crownpink:1449139449211387945>' }, // Transfer/Owner?
    { original: '📊', new: '<:voice2:1358152471687467228>' }, // Info
    { original: '🗑️', new: '<:delete:1518723074231632034>' }, // Delete

    // Additional ones
    // { original: '⚠️', new: '<a:warning_animated:1361729714259099809>' }, // Warning
    // { original: '❌', new: '<:delete:1518723074231632034>' } // Error? Maybe too aggressive to replace all X with trash.
];

let updatedCount = 0;

files.forEach(file => {
    // Skip already manually handled files to avoid conflicts/double edits if they used the literal emoji in a way that shouldn't be replaced
    if (file === 'panel.js') return;

    const filePath = path.join(commandsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(rep => {
        // Replace globally
        // Escape regex special chars if any (emojis are usually safe)
        const regex = new RegExp(rep.original, 'g');
        content = content.replace(regex, rep.new);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated emojis in ${file}`);
        updatedCount++;
    }
});

console.log(`Total files updated: ${updatedCount}`);
