const { SlashCommandBuilder, MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vouch')
        .setDescription('Leave feedback for PURE')
        .addIntegerOption(option => 
            option.setName('stars')
                .setDescription('Rating (1-5 Stars)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(5))
        .addStringOption(option => 
            option.setName('comment')
                .setDescription('Your comment')
                .setRequired(true)),

    async execute(interaction) {
        const stars = interaction.options.getInteger('stars');
        const comment = interaction.options.getString('comment');
        const user = interaction.user;

        const vouchData = {
            userId: user.id,
            username: user.username,
            stars: stars,
            comment: comment,
            timestamp: new Date().toISOString()
        };

        
        const filePath = path.join(__dirname, './vouches.json');
        let vouches = [];
        
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            vouches = JSON.parse(fileData);
        }

        vouches.push(vouchData);
        fs.writeFileSync(filePath, JSON.stringify(vouches, null, 2));

        
        const starString = '⭐'.repeat(stars);

        
        const vouchContainer = new ContainerBuilder()
            .setAccentColor(0x00aaff)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# NEW VOUCH! 🏆`),
                new TextDisplayBuilder().setContent(`**User:** ${user.username} (${user})`),
                new TextDisplayBuilder().setContent(`**Rating:** ${starString} (${stars}/5)`)
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(1).setDivider(true))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`### Comment:\n> ${comment}`)
            )
            .addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(
                    new MediaGalleryItemBuilder().setURL('https://cdn.discordapp.com/attachments/1385304584418754663/1387759183671332874/Komp_2_1.gif?ex=697163b4&is=69701234&hm=45534ab0667ff475254ef478070f65fa4074a63e7b1a7ee9f2b7a8344b1193c2&')
                )
            );

        
        const vouchChannelId = config.vouchChannelId;
        const vouchChannel = interaction.guild.channels.cache.get(vouchChannelId);
        
        if (vouchChannel) {
            await vouchChannel.send({ 
                components: [vouchContainer],
                flags: MessageFlags.IsComponentsV2
            });
        }

        
        const responseContainer = new ContainerBuilder()
            .setAccentColor(0x00aaff)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# Thank you for your feedback!\n\nYour rating of **${stars} stars** has been saved successfully.`)
            );

        await interaction.reply({ 
            components: [responseContainer], 
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    },
};
