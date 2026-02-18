const config = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    
    const activities = [
      {
        name: config.statusText1 || 'getpure.cc',
        type: 0 
      },
      {
        name: config.statusText2 || 'hopeleaks.cc',
        type: 3 
      }
    ];
    
    let activityIndex = 0;
    
    
    client.user.setPresence({
      activities: [activities[activityIndex]],
      status: 'idle' 
    });
    
    
    setInterval(() => {
      activityIndex = (activityIndex + 1) % activities.length;
      client.user.setPresence({
        activities: [activities[activityIndex]],
        status: 'idle'
      });
    }, 30000); 
  },
};