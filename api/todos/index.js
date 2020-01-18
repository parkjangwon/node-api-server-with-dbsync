/*
  @author pjw vim@kakao.com
  @since 20200107

  Todo API에 대한 라우팅 설정 파일
 */
const express = require('express');
const router = express.Router();
const controller = require('./todo.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/', controller.destroyAll);
router.delete('/:id', controller.destroy);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;