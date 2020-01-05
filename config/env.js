/*
  @author pjw vim@kakao.com
  @since 20200106
  
  데이터베이스의 테이블 정의 등.. 관련 설정 파일
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