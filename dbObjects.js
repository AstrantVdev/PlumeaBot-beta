const { Sequelize } = require('sequelize')
const { config } = require('./config')

module.exports = {

    Sync(){
        global.Member = this.members.sync()
        console.log(Member)
        global.Opinion = this.opinions.sync()
        global.Sprint = this.sprint.sync()
        global.Text = this.texts.sync()
        global.ParameterId = this.ParameterId.sync()
        global.ParameterDate = this.ParameterId.sync()

    },

    autoSet(){
        const sprint = require ('./utils/sprint')
        if(sprint.exists(0)) sprint.addOne(0)

        const { isWeeklyResetDate, setWeeklyResetDate, isBumpDate, setBumpDate } =  require('./utils/somes')
        if(!isWeeklyResetDate()) setWeeklyResetDate()
        if(!isBumpDate()) setBumpDate(new Date)

    },

    logEdit(edit){
        const messageUtil = require('./utils/message')
        const messageEmbed = messageUtil.newEmbed()
        .setTitle('dbEdit')
        .setAuthor({ name: 'o', iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://discord.gg/arbnrxWFVu' })
        .setDescription(edit)

        const logsId = config.channels.logs

        client.channels.fetch(logsId)
		.then(channel => channel.send({embeds:[messageEmbed]}))
		.catch(console.error)
    },
    
    members: 
    sequelize.define('member', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true
        },
        nick: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        joinDate: {
            type: Sequelize.DATEONLY,
            defaultValue: new Date().getDate

        },
        plumes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        coins: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        weeklyWords: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        textsUUIDs: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.UUIDV4, Sequelize.STRING(6))),
            defaultValue: [[]]
        }

    }),

    texts: 
    sequelize.define('text', {
        id: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        dt: Sequelize.STRING,
        title: Sequelize.STRING,
        desc: Sequelize.TEXT,
        authorId: Sequelize.INTEGER,
        chap1: Sequelize.INTEGER,
        chap2: Sequelize.INTEGER,
        words: Sequelize.INTEGER,
        mes1: Sequelize.INTEGER,
        mes2: Sequelize.INTEGER,
        date: Sequelize.DATE,
        password: '',
        themes: Sequelize.ARRAY(Sequelize.STRING),
        questions: Sequelize.ARRAY(Sequelize.STRING)

    }),

    opinions: 
    sequelize.define('opinion', {
        n: Sequelize.INTEGER,
        text: Sequelize.UUIDV4,
        sender: Sequelize.INTEGER,
        date: Sequelize.DATE
    }),

    sprint: 
    sequelize.define('sprint', {
        id: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            primaryKey: true,
            unique: true
        },
        time: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        maxTime: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        sprinters: {
            type: Sequelize.ARRAY(Sequelize.INTEGER, Sequelize.INTEGER),
            defaultValue: []
        },
        messageId: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        }

    }),

    FileInPosting: 
    sequelize.define('fileInPosting', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
        },
        dt: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        fileId: {
            type: Sequelize.INTEGER,
            unique: true,
        },
    }),

    ParameterId: 
    sequelize.define('parameterId', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
        },
        paramId: Sequelize.INTEGER

    }),

    ParameterDate: 
    sequelize.define('parameterDate', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
        },
        date: Sequelize.DATE

    }),

    dbCreate(db, what){
        const edit = db.create(what)
        this.logEdit(edit)
    },

    dbDestroy(db, id){
        const edit = db.destroy({ where: { id: id } })
        this.logEdit(edit)
    },

    dbExist(db, id){
        return db.findOne({ where: { id: id } }) != null
    },

    dbGetAll(db, Atr){
        return db.findAll({
            attributes: Atr
        })
    },

    dbGet(db, id){
        return db.findOne({ where: { id: id } })
    },

    dbGetAtr(db, id, atr){
        return db.findOne({ 
            where: { id: id },
            attributes: [atr]
        })
    },

    dbSetAtr(db, id, atr, val){
        edit = db.update({ [atr]: val}, { where: { id: id } })
        this.logEdit(edit)
    },

    dbSetAtrToAll(db, atr, val){
        edit = db.update({ [atr]: val} )
        this.logEdit(edit)
    },

    dbAddAtr(db, id, atr, val){
        const append = {[atr]: sequelize.fn('array_append', sequelize.col(atr), val)}

        edit = db.update( append, { 'where': { id: id } })
        this.logEdit(edit)
    },

    dbRemoveAtr(db, id, atr, val){
        const append = {}
        append[atr] = sequelize.fn('array_remove', sequelize.col(atr), val)

        edit = db.update( append, { 'where': { id: id } })
        this.logEdit(edit)
    },

    dbRemoveAtrIndex(db, id, atr, index){
        const list = this.dbGetAtr(db, id, atr)
        const o = list[index]
        this.dbRemoveAtr(db, id, atr, o)
    },

    dbIncrementAtr(db, id, atr, i){
        const edit = db.increment(atr, { by: i, where: { id: id }})
        this.logEdit(edit)
    }

}