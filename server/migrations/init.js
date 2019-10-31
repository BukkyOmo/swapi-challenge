import User from './users';
import Comment from './comments';
import dropAllTables from './drop';
import ForeignKey from './foreignKeys';
import logger from '../../config/winston';

// Instatiate Database
(async () => {
  await dropAllTables();
  await User();
  await Comment();
  await ForeignKey();
  logger.debug('###############################################################');
  logger.debug('                   DONE, MIGRATION COMPLETE!                   ');
  logger.debug('###############################################################');
})().catch((err) => {
  logger.debug(err);
});
