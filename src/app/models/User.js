import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        // password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );
    //trecho de codigo que acontece baseado em ações (tipo tigger)
    // this.addHook('beforeSave', async user =>{
    //   if(user.password){
    //     user.password_hash = await bcrypt.hash(user.password, 8);
    //   }
    // });

    return this;
  }

  //verificação de senha normal e com hash
  // checkPassword(password){
  //   return bcrypt.compare(password, this.password_hash);
  // }
}

export default User;
