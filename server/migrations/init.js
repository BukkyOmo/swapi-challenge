import User from './users';
import Comment from './comments';
import dropAllTables from './drop';
import logger from '../../config/winston';

// Instatiate DB
(async () => {
  await dropAllTables();
  await User();
  await Comment();
  logger.debug('###############################################################');
  logger.debug('                   DONE, MIGRATION COMPLETE!                   ');
  logger.debug('###############################################################');
})().catch((err) => {
  logger.debug(err);
});
