const express = require('express');
const app = express();
const {User, sequelize} = require('../models/userModel');
var bodyParser = require('body-parser')

class UserController {

    async createUser(id, name, login, pass, age, weight, height, sex, obj, xp, routine_id) {
        // Checagens vai ser no banco

        try {
            const checkEmptyString = (value) => (value === "") ? null : value;

            // Executa a checagem em cada campo necessário
            const checkedName = checkEmptyString(name);
            const checkedLogin = checkEmptyString(login);
            const checkedPass = checkEmptyString(pass);
            const checkedSex = checkEmptyString(sex);
            const checkedObj = checkEmptyString(obj);
          
            // Aqui você pode usar os campos verificados para criar o usuário
            // ou realizar outras operações necessárias
            // Exemplo:
            const newUser = await User.create({
              id: id,
              name: checkedName,
              login: checkedLogin,
              pass: checkedPass,
              age: age,
              weight: weight,
              height: height,
              sex: checkedSex,
              obj: checkedObj,
              xp: xp,
              routine_id: routine_id
            });
        
            const response = {
                newUser: newUser,
                message: 'Inserção do usuário foi efetuada corretamente.',
            }; // retornando o JSON para ver o resultado

            return response; // Envie a resposta JSON no caso de sucesso
        } catch (error) {
            //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
            //console.log(error)
            const response = {
                sql: error.parent.sql,
                parameters: error.parent.parameters,
                message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
      }
    }
  
    async getUserBy(whereClause) {
        try{
            const records = (await User.findAll({
              where: whereClause,
            })).map(record => record.toJSON());
      
            if (records.length === 0) {
              return {message: "Nenhum registro encontrado."};
            }else{
              return records; // Imprima os registros como JSON
            }
        }catch(error){
        // já já mudar o erro para JSON
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
            //console.error('Erro ao pesquisar registros:', error);
        }
    }
  
    async updateUser(id, updateClause) {
        try {
            const user = await User.findByPk(id);
            if (user) {
              const updateUser = await user.update(updateClause);
              const response = {
                updateUser: updateUser,
                message: 'Usuário atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Usuário não encontrado.'};
            }
          } catch (error) {
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response;
            }
        }

    async deleteUserBy(id) {
        try {
            const numDeleted = await User.destroy({
               where: { id: id }
            });
            //console.log(numDeleted);
            if (numDeleted >= 1){
                return {message: "Usuário excluído com sucesso."};
            }
            else{
               return {message: "Nenhum usuário encontrado com o ID fornecido."};
            }
            } catch{
             const response = {
               sql: error.parent.sql,
               parameters: error.parent.parameters,
               message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
           }
    }
}
  
module.exports = UserController;