module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears de chat",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("jij mag dat helemaal niet stouterd").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("vgm is dat geen nummer slimpie, en aan 0 heb ik ook niks").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("HUH ik heb geen perms").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Ik heb \`${deleted.size}\` berichten verwijder!`))
            .catch(err => message.reply(`Er ging iets fout ${err}`));
    }
}