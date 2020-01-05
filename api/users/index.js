/*
  @author pjw vim@kakao.com
  @since 20200103

  User API에 대한 라우팅 설정 파일
 */
const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
