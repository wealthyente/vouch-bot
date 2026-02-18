const { Client, Collection, GatewayIntentBits, REST, Routes, EmbedBuilder, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');



module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    
    if (interaction.isChatInputCommand()) {
      console.log(`Received command: ${interaction.commandName} from user: ${interaction.user.tag}`);
      
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      
      if (interaction.replied || interaction.deferred) {
        console.log(`Interaction already replied for command: ${interaction.commandName}`);
        return;
      }

      try {
        console.log(`Executing command: ${interaction.commandName}`);
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        
      }
    }
    
    
  }
};