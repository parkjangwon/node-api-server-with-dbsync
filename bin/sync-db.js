/*
  @author pjw vim@kakao.com
  @since 20200106
  
  데이터베이스 sync
 */
const models = require('../modules/db/models');

module.exports = () => {
  /* sync()에서 force가 false인 경우 테이블이 있을 경우 만들지 않는다. */
  return models.sequelize.sync({ force: false });
};
