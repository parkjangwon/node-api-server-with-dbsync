/*
  @author pjw vim@kakao.com
  @since 20200106
  
  데이터베이스 접속 정보 설정
 */
const envs = {
  dev: {
    mysql: {
      host: 'localhost',
      port: '3306',
      username: 'username',
      password: 'password',
      database: 'database'
    }
  },

  prod: {
    mysql: {
      host: 'localhost',
      port: '3306',
      username: 'username',
      password: 'password',
      database: 'database'
    }
  }
};

const nodeEnv = process.env.NODE_ENV || 'dev';

module.exports = envs[nodeEnv];