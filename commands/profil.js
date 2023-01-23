const { SlashCommandBuilder } = require('discord.js')
const mes =  require('../utils/message')
const { getOne } = require('../utils/member')

module.exports = {
	data(){
		let data = new SlashCommandBuilder()
		.setName('profil')
		.setDescription('Profil d~un plumeen')
		.addUserOption(option => option
			.setName('user')
			.setDescription('plumeen')
			.setRequired(true))

		return data

	},

	execute(inter) {
		const user = inter.options.getUser('user')
		const id = user.id

		const m = getOne(id)

		message = '**Profil de: <@'+user.id+'>**\n\n'
		message += 'Nick: *'+m.nick+'*\n'
		message += 'Arrivée: *'+m.joinDate+'*\n'
		message += 'Plumes: *'+m.plumes+'*\n'
		message += 'Coins: *'+m.coins+'*\n'
		message += 'MotsHebdo: *'+m.weeklyWords+'*\n\n'

		const textsUUIDs = m.textsUUIDs
		if(textsUUIDs){
			message += 'Textes: \n'
			for(t in m.textsUUIDs){
				message += `- ${t} \n`
			}

		}

        mes.newEmbed().setDescription(message)
		mes.cmdSuccess(inter, { embeds: [messageEmbed]})

	}

}