const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vouches-restore')
        .setDescription('Restore all vouches from vouches.json (Admin Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const filePath = path.join(__dirname, './vouches.json');
        
        if (!fs.existsSync(filePath)) {
            return interaction.editReply({ content: 'No vouches.json found.' });
        }

        const fileData = fs.readFileSync(filePath, 'utf8');
        const vouches = JSON.parse(fileData);

        if (vouches.length === 0) {
            return interaction.editReply({ content: 'The vouches.json is empty.' });
        }

        let count = 0;
        for (const vouch of vouches) {
            const starString = '⭐'.repeat(vouch.stars);
            
            const vouchContainer = new ContainerBuilder()
                .setAccentColor(0x00aaff)
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`# VOUCH (RESTORED) 🏆`),
                    new TextDisplayBuilder().setContent(`**User:** ${vouch.username}`),
                    new TextDisplayBuilder().setContent(`**Rating:** ${starString} (${vouch.stars}/5)`),
                    new TextDisplayBuilder().setContent(`**Datum:** ${new Date(vouch.timestamp).toLocaleDateString()}`)
                )
                .addSeparatorComponents(new SeparatorBuilder().setSpacing(1).setDivider(true))
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`### Comment:\n> ${vouch.comment}`)
                )
                                          .addMediaGalleryComponents(
          new MediaGalleryBuilder().addItems(
            new MediaGalleryItemBuilder().setURL('https://cdn.discordapp.com/attachments/1385304584418754663/1387759183671332874/Komp_2_1.gif?ex=697163b4&is=69701234&hm=45534ab0667ff475254ef478070f65fa4074a63e7b1a7ee9f2b7a8344b1193c2&')
          )
        );

            await interaction.channel.send({ 
                components: [vouchContainer],
                flags: MessageFlags.IsComponentsV2
            });
            
            count++;
            
            // Small delay to avoid rate limits if there are many vouches
            if (count % 5 === 0) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }

        await interaction.editReply({ content: `${count} Vouches have been restored with Components V2.` });
    },
};
