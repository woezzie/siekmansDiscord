const  Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const {prefix, token, giphyToken} = require('./config.json');
const client = new Discord.Client();
const activities_list = [
    "Boas verkrachten", 
    "?help voor commands",
    "World of Warcraft",
    "Bril aan het poetsen",  
    "Boas verkrachten",
    "huiswerk nakijken",
    "VMware opzetten",
    "Fortnite",  
    "Kutkinders les geven"
    ];

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

//--------------------Update-Knop-&-Status-randomizer---------------------------------------------------------------------------------


client.once('ready', () => {
    console.log('Ready!')
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 60000);
});

//--------------------Welkom-bericht----------------------------------------------------------------------------------------------


client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Wie is ${member}? krijg het gevoel dat ie homo is :thinking:`);
  });

//--------------------Kick-&-Ban-----------------------------------------------------------------------------------------------

client.on('message', message => {
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        if(message.content.startsWith(`${prefix}op gekankert`)) {
    
            let member = message.mentions.members.first();
            member.kick().then((member) => {

                giphy.search('gifs', {"q": "bye"})
                    .then((response) => {
                        var totalReponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalReponses;
                        var responseFinal = response.data[responseIndex];

                        message.channel.send(":wave: " + member.displayName + " is weg gekankert!", {
                            files: [responseFinal.images.fixed_height.url]
                        })
                    
                    }).catch(() => {
                        message.channel.send('Je moet ook zeggen wie ik moet kicken, droeftoeter!');
                    })
            })

            
        }  
    }
    
})

client.on('message', message => {
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        if(message.content.startsWith(`${prefix}weggekankert`)) {
    
            let member = message.mentions.members.first();
            member.ban().then((member) => {

                giphy.search('gifs', {"q": "get the fuck out"})
                    .then((response) => {
                        var totalReponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalReponses;
                        var responseFinal = response.data[responseIndex];

                        message.channel.send(":100: " + member.displayName + " zien we mooi niet terug", {
                            files: [responseFinal.images.fixed_height.url]
                        })
                    
                    }).catch(() => {
                        message.channel.send('Sjonge jongen hij wilt niet werken, vgm ben jij beetje incapabel');
                    })
            })

            
        }  
    }
    
})


//--------------------Embed-messages------------------------------------------------------------------------------------------------

client.on('message', message => {
    if (message.content === `${prefix}zelfmoord`) {

      const embed = new RichEmbed()
        
        .setTitle('Hulp met zelfmoord')
        .setColor(0xee5534)
        .setDescription('Hey ' + message.author + ', \n Ik zie dat je denkt aan zelfmoord. \n De grote kerk in Elburg is een perfecte plek om vanaf te springen!') 
        .setImage('https://upload.wikimedia.org/wikipedia/commons/e/e5/Toren_Grote_of_Sint-Nicolaaskerk_Elburg.jpg')
        .setFooter('Dit bericht werd mede mogelijk gemaakt door de grote kerk in Elburg', 'https://www.geelvinck.nl/assets/Elburg-Grote-Kerk--300x300.jpg');

      message.channel.send(embed);
    }
  });

  client.on('message', message => {
    if (message.content === `${prefix}localkech`) {

      const embed = new RichEmbed()
        
        .setTitle('Lokale hoer')
        .setColor(0xee34c9)
        .setDescription('Hier op de server is <@203837717107179521> de lokale hoer. \n Voel je vrij om hem ff een berichtje te sturen voor wilde seks.') 
        .setImage('https://f.jwwb.nl/public/t/v/b/fonds/foto.jpg')

      message.channel.send(embed);
    }
  });

//--------------------Respond-messages------------------------------------------------------------------------------------------------

client.on('message', message => {
    if(message.content.toLowerCase() === 'klootzak')
    message.channel.send('KANKER');
})

client.on('message', message => {
    if(message.content.toLowerCase() === 'wie komt csgo?')
    message.channel.send('Kanker ff heel snel op');
})

client.on('message', message => {
    if(message.content.toLowerCase() === 'potje fortnite?')
    message.channel.send('Duos? ' + message.author);
})

client.on('message', message => {
    if(message.content.toLowerCase() === `${prefix}suicide`)
    message.channel.send('Ik ken dat niet, ik denk dat je **?zelfmoord** bedoeld.');
})

client.on('message', message => {
    if(message.content.toLowerCase() === `${prefix}user-info`)
	message.channel.send(`**Je gebruikersnaam:** ${message.author.username}\n**Je ID:** ${message.author.id}`);
})

client.on('message', message => {
    if(message.content.toLowerCase() === 'pubg?')
	message.channel.send('ja maar dan moet <@271014909402152966> wel komen nu nu');
})

client.login(process.env.token);