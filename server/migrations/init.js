import Comment from './comments';
import dropAllTables from './drop';
import logger from '../../config/winston';

// Instatiate Database
(async () => {
  await dropAllTables();
  await Comment();
  logger.debug('###############################################################');
  logger.debug('                   DONE, MIGRATION COMPLETE!                   ');
  logger.debug('###############################################################');
})().catch((err) => {
  console.log(err);
});
