import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {getSequelize} from "../../Common/services/sequelize.service";

class Task extends Model<
    InferAttributes<Task>,
    InferCreationAttributes<Task>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare status: string;
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

(async function (){
    const sequelize = await getSequelize();
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            description: {
                type: new DataTypes.STRING(256),
                allowNull: false
            },
            status: {
                type: new DataTypes.STRING(30),
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'tasks'
        }
    );
    await Task.sync({alter:true});

})();

export default Task;