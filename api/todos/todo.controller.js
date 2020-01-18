/*
  @author pjw vim@kakao.com
  @since 20200107

  Todo API의 실제 로직 작성
 */

// 데이터베이스 커넥션 객체 정의
const models = require('../../modules/db/models');

// 전체 todo 객체 배열을 리턴 하는 api
exports.index = (req, res) => {
  models.Todo.findAll().then(todos => {
    return res.json(todos);
  });
};
// id값을 통하여 특정 todo 객체를 리턴하는 api
exports.show = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    return res.status(400).json({ error: 'Incorrect id' });
  }

  models.Todo.findOne({
    where: {
      id: id
    }
  }).then(todo => {
    if (!todo) {
      return res.status(404).json({ error: 'No todo' });
    }

    return res.json(todo);
  });
};

// 전체 todo를 삭제하는 api
exports.destroyAll = (req, res) => {
  models.Todo.destroy({
    where: {}
  }).then(() => {
    return res.status(201).send();
  });
};

// id값을 통하여 해당하는 todo를 삭제하는 api
exports.destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    return res.status(400).json({ error: 'Incorrect id' });
  }

  models.Todo.destroy({
    where: {
      id: id
    }
  }).then(() => {
    return res.status(201).send();
  });
};

// todo를 추가하는 api
exports.create = (req, res) => {
  const todo = req.body.todo || '';

  if (!todo.length) {
    return res.status(400).json({ error: 'Incorrect todo' });
  }

  models.Todo.create({
    todo: todo
  }).then(todo => {
    return res.status(201).json(todo);
  });
};

// todo의 완료 여부를 수정하는 api
exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    return res.status(400).json({ error: 'Incorrect id' });
  }

  const completed = req.body.completed;

  if (completed < 0 || completed > 1) {
    return res.status(400).json({ error: 'Incorrect completed' });
  }

  models.Todo.update({ completed: completed }, { where: { id: id } }).then(
    todo => {
      return res.status(201).json(todo);
    }
  );
};
