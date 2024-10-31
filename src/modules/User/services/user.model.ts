import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {getSequelize} from "../../Common/services/sequelize.service";
import defaultUsers from "./default-users";
import {Password} from "../../Common/services/password.service";

class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

(async function (){
    const sequelize = await getSequelize();
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            password: {
                type: new DataTypes.STRING(256),
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'users'
        }
    );
    await User.sync({alter:true});
    const count = await User.count();
    if(count == 0){
        for (const u of defaultUsers){
            const data = {
                ...u,
                password: await Password.toHash(u.password),
            }
            await User.create(data);
        }
    }

})();

export default User;