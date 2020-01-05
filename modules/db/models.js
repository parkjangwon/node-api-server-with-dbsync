/*
  @author pjw vim@kakao.com
  @since 20200106
  
  데이터베이스의 테이블 정의 등.. 관련 설정 파일
 */
const Sequelize = require('sequelize');

/* 데이터베이스 설정정보를 정의한 파일 */
const config = require('../../config/env');

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/* 
define 메서드의 첫번 째 인자가 데이터베이스 내 생성 될 테이블 이름이다.
여기서 name은 컬럼명, 값으로는 해당 컬럼의 데이터 타입을 정의한다.
 */
const User = sequelize.define('user', {
  name: Sequelize.STRING
});

/* ES6 Syntax = sequelize: sequelize, */
module.exports = {
  sequelize,
  User
};
