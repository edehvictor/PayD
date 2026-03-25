import { payrollWorker } from './payrollWorker.js';
import { getSorobanIndexer } from '../services/sorobanEventIndexer.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export const startWorkers = () => {
    logger.info('Starting BullMQ workers...');

    // Workers are started when imported
    if (payrollWorker.isRunning()) {
        logger.info('Payroll worker is running');
    }

    // Start Soroban event indexer if enabled
    if (config.sorobanIndexer.enabled) {
        const sorobanIndexer = getSorobanIndexer();
        sorobanIndexer.start().catch(error => {
            logger.error('Failed to start Soroban event indexer:', error);
        });
        logger.info('Soroban event indexer started');
    } else {
        logger.info('Soroban event indexer disabled');
    }
};
