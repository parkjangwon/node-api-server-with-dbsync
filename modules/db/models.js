/*
  @author pjw vim@kakao.com
  @since 20200106
  
  데이터베이스 커넥션 객체 생성 및 테이블 정의
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
define 메서드의 첫번째 인자가 데이터베이스 내 생성될 테이블 이름이다.
여기서 name은 컬럼명, 값으로는 해당 컬럼의 데이터 타입을 정의한다.
- 기본으로 생성되는 컬럼
> id : 해당 테이블의 pk로 사용 되는 컬럼
> createdAt : 해당 row가 insert가 된 날짜가 저장 되는 컬럼
> updatedAt : 해당 row가 update가 된 날짜가 저장 되는 컬럼

sequelize의 세부적인 DataType은 아래 링크를 참고하라.
url: https://sequelize.org/master/manual/data-types.html

[컬럼 세부 정의 예제]
name: {
        type: 자료형 (STRING(글자수), INTEGER, FLOAT, TEXT, BOOLEAN)
        allowNull : NULL 넣어도 돼냐,
        unique: 고유값 여부,
        comment: 컬럼 설명,
        primaryKey : 기본키 여부(id대체)   
    },

예제 출처: https://velog.io/@chltndid724/Immersive-2%EC%A3%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Corum-9ok02jmu5c
 */

// 사용자 테이블
const User = sequelize.define('user', {
  name: Sequelize.STRING
});

// 할일 테이블
const Todo = sequelize.define('todo', {
  todo: Sequelize.STRING,
  completed: {
    type: 'INTEGER',
    defaultValue: '0'
  }
});

// ES6 Syntax = sequelize: sequelize,
module.exports = {
  sequelize,
  User,
  Todo
};
