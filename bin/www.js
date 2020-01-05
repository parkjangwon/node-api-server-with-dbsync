/*
  @author pjw vim@kakao.com
  @since 20200106
  
  Express 서버 구동 파일
 */
const app = require('../server');
const port = 3000;
const syncDatabase = require('./sync-db');
// 운영모드로 살행시 NODE=prod npm start 명령어를 사용한다.
const nodeEnv = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
  console.log(`Simple API Server listening on port ${port}!`);
  console.log(nodeEnv);

  syncDatabase().then(() => {
    console.log('Database sync');
  });
});
