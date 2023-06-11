import {Tab, db} from "../dbManager";
import {DataTypes} from "sequelize";

export class Sprinter extends Tab{

    constructor(id=null) {
        super(id)
    }

    getTab = db.define('sprinters', {
        userId: DataTypes.STRING,
        sprint: DataTypes.UUID,
        join: DataTypes.DATE

    })

}