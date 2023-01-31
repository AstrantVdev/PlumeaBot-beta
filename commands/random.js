const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('random')
        .setDescription('Donne un nombre au hasard')
        .addIntegerOption(option => option
            .setMinValue(1)
            .setMaxValue(100)
            .setName('faces')
            .setDescription('Nombre de faces du dé virtuel (1-100')
            .setRequired(true))

        return data

    },

	execute(inter) {
        let n = inter.options.getInteger('faces')
        const r = Math.floor(Math.random() * (n + 1))

        require('../utils/message').
        interSuccess(inter, `Tu avais une chance sur ${n}, et c~est un: ||     ${r}     || !\n**^^**`)

	}

}