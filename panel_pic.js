const images = [
  "https://i.postimg.cc/MGSMTnVX/image.png",
  "https://i.postimg.cc/Zn20hnJh/image.png",
  "https://i.postimg.cc/BZT4VkDr/image.png",
  "https://i.postimg.cc/bvcmWCQP/image.png",
  "https://i.postimg.cc/k5TTjxv6/image.png",
  "https://i.postimg.cc/G3xnQYwN/image.png",
  "https://i.postimg.cc/hPnVdXVk/image.png",
  "https://images-ext-1.discordapp.net/external/XO4E4bKQ8BCQLgVMMkT7b3ckvzEuxKud-nYFK0BkY24/https/media.tenor.com/L81VxCaygp8AAAPo/aesthetic-banner.mp4",
  "https://images-ext-1.discordapp.net/external/_7fJ4ECJavcjz2eZhmZ1ZfZ0N2s9GGyfsoSlE9G-8Ec/https/media.tenor.com/4ahOyDZiNIkAAAPo/super-sonico.mp4",
  "https://images-ext-1.discordapp.net/external/GZyJOxkMzUxh34ENUr76B9DDamK35VZ0jvQ-n0E4Ygg/https/nekos.best/api/v2/kiss/3eb02569-bc4d-4fcf-95c9-2d14cefd05ab.gif?width=550&height=305",
  "https://i.postimg.cc/HLzxkBT6/image.png"
];

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

module.exports = { images, getRandomImage };
