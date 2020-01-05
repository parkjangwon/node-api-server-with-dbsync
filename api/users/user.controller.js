/*
  @author pjw vim@kakao.com
  @since 20200103

  User API의 실제 로직 작성
 */

// DB 연동
const models = require('../../modules/db/models');

// user 객체 배열을 리턴 하는 api
exports.index = (req, res) => {
  // findAll() : select query를 수행하는 메서드 (where 조건이 들어가지 않는다)
  models.User.findAll().then(users => {
    return res.json(users);
  });
};

// id값을 통하여 특정 user 객체를 반환하는 api
// http://127.0.0.1:3000/users/1 <-- 이런 식으로 호출 한다.
exports.show = (req, res) => {
  // 인자가 되는 id 값이 숫자인지 검증 (10진수) : true, false 리턴
  const id = parseInt(req.params.id, 10);

  // id가 숫자가 아닌 경우 응답값에 에러를 담는다.
  if (!id) {
    return res.status(400).json({ error: 'Incorrect id' });
  }

  // findOne() : select query를 수행하는 메서드 (where 조건이 들어간다)
  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({ error: 'No User' });
    }

    return res.json(user);
  });
};

// user를 삭제하는 api
exports.destroy = (req, res) => {
  // 인자값 유효성 검증
  const id = parseInt(req.params.id, 10);

  // id가 숫자가 아닌 경우 에러 리턴
  if (!id) {
    return res.status(400).json({ error: 'Incorrect id' });
  }

  // destroy() : delete query를 수행하는 메서드
  models.User.destroy({
    where: {
      id: id
    }
  }).then(() => {
    return res.status(201).send();
  });
};

// user를 생성하는 api
exports.create = (req, res) => {
  // req.body에서 name의 값을 상수 name에 할당한다.
  // 만약 req.body.name의 값이 없는 경우 공백을 할당한다.
  const name = req.body.name || '';

  // user의 이름이 없는 경우 응답값에 에러 내용을 담는다.
  if (!name.length) {
    return res.status(400).json({ error: 'Incorrect name' });
  }
  // create() : insert query를 수행하는 메서드
  models.User.create({
    name: name
  }).then(user => {
    return res.status(201).json(user);
  });
};

exports.update = (req, res) => {
  // 인자값 유효성 검증
  const id = parseInt(req.params.id, 10);

  // id가 숫자가 아닌 경우 에러 리턴
  if (!id) {
    return res.status(400).json({ error: 'Incorrect id' });
  }

  // req.body에서 name의 값을 상수 name에 할당한다.
  // 만약 req.body.name의 값이 없는 경우 공백을 할당한다.
  const newName = req.body.name || '';

  // user의 이름이 없는 경우 응답값에 에러 내용을 담는다.
  if (!newName.length) {
    return res.status(400).json({ error: 'Incorrect name' });
  }
  // update() : update query를 수행하는 메서드
  models.User.update(
    // set data
    { name: newName },
    // where
    { where: { id: id } }
  ).then(user => {
    return res.status(201).json(user);
  });
};
