const { SlashCommandBuilder, MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vouches')
        .setDescription('Show feedback statistics for PURE'),

    async execute(interaction) {
        const filePath = path.join(__dirname, './vouches.json');
        
        if (!fs.existsSync(filePath)) {
            return interaction.reply({ content: 'No feedback available yet.', flags: MessageFlags.Ephemeral });
        }

        const fileData = fs.readFileSync(filePath, 'utf8');
        const vouches = JSON.parse(fileData);

        if (vouches.length === 0) {
            return interaction.reply({ content: 'No feedback available yet.', flags: MessageFlags.Ephemeral });
        }

        const totalVouches = vouches.length;
        const totalStars = vouches.reduce((acc, curr) => acc + curr.stars, 0);
        const averageRating = (totalStars / totalVouches).toFixed(1);

        
        const latestVouches = vouches.slice(-5).reverse();
        let vouchList = '';
        
        for (const v of latestVouches) {
            const stars = '⭐'.repeat(v.stars);
            vouchList += `**${v.username}**: ${stars}\n> ${v.comment.substring(0, 100)}${v.comment.length > 100 ? '...' : ''}\n\n`;
        }

        const statsContainer = new ContainerBuilder()
            .setAccentColor(0x00aaff)
            .addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(
                    new MediaGalleryItemBuilder().setURL('https://cdn.discordapp.com/attachments/1456914545061793823/1457324336556933171/serverbanner_pure2.gif?ex=695b968d&is=695a450d&hm=647c10a154e4d79d07a71b607eba39e75434f2c7ba69c53b6c4b4ebdc67bbc24&')
                )
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# PURE FEEDBACKS`)
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(1).setDivider(true))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## STATISTICS
**Total Feedbacks:** ${totalVouches}
**Average Rating:** ⭐ ${averageRating}/5.0`)
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(1).setDivider(true))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## RECENT FEEDBCKS:
${vouchList || 'No recent feedback available.'}`)
            );

        await interaction.reply({ 
            components: [statsContainer], 
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    },
};
