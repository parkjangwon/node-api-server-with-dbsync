/*
  @author pjw vim@kakao.com
  @since 20200103
  
  해당 프로젝트의 전반적인 코드는 아래 블로그에서 참고했습니다.
  http://webframeworks.kr/tutorials/nodejs/

  Express 서버 설정 파일
 */
const express = require('express');

/* http 요청 body에 접근 가능하도록 bodyParser를 추가한다. */
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' })); //body 의 크기 설정
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); //url의 크기 설정

/* 보안 설정 */
const helmet = require('helmet');
/* 서버 정보 노출 방지 */
app.disable('x-powered-by');
/* XSS 방지 */
app.use(helmet.xssFilter());
/* 클릭재킹 방지 */
app.use(helmet.frameguard('deny'));
/* 브라우저에서 파일 형식 추측 금지 */
app.use(helmet.noSniff());

/* 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용 */
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello, Node.JS!'));

/* 
users 라우팅 모듈 사용
모든 리퀘스트 중 ~/users 으로 시작되는 요청은 2번째 파라미터로 오는 미들웨어가 담당한다.
 */
app.use('/users', require('./api/users'));

module.exports = app;
