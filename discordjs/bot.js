 require('dotenv').config();
// console.log(process.env.DISCORD_BOT_TOKEN);

const {Client} =require('discord.js');
const client=new Client();//creating instance of client

//ready event

client.on('ready',()=>{
    console.log(`${client.user.username} has logged in`);
    //console.log("The bot has logged in.");
});

client.on('message',(message)=>{
    //console.log(message.content);
    //console.log(`[${message.author.tag}]:${message.content}`);
    if(message.content=='hello'){
        //message.reply('hello there from bot');//tag the user
        message.channel.send('hello from other side');
    }
});
client.login(process.env.DISCORD_BOT_TOKEN); //after this bot will be online
//when the bot logs in it emits ready event
