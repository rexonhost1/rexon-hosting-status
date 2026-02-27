const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = "1476992756009271377";

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Rotating statuses
    const statuses = [
        { name: "RexonCloud", type: ActivityType.Playing },
        { name: "Hosting Servers", type: ActivityType.Watching },
        { name: "Monitoring Activity", type: ActivityType.Listening }
    ];

    let i = 0;
    setInterval(() => {
        const status = statuses[i];
        client.user.setActivity(status.name, { type: status.type });
        i = (i + 1) % statuses.length;
    }, 15000); // rotate every 15 seconds

    // Send embed + ping everyone once when bot is ready
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);

        // Create the embed
        const embed = new EmbedBuilder()
            .setTitle("🚨 Rexon Hosting Offer!")
            .setDescription(`
**📈 CPU: ♾️

📟 RAM: ♾️

💾 SSD: ♾️**

• ✨ NVME SSD with 500mps Speed.
• ✨ 8 core CPU.
• ✨ High Speed Ram.

**💵 At ₹60/- Per Month Only! 💵**

Available Till: 7 Days!
`)
            .setColor("Red")
            .setFooter({ text: "Rexon Hosting" })
            .setTimestamp();

        // Send message with embed AND ping @everyone
        await channel.send({ content: "@everyone @here", embeds: [embed] });

        console.log("Status embed sent with ping!");
    } catch (err) {
        console.error("Failed to send embed:", err);
    }
});

client.login(TOKEN);



