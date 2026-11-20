import { logger } from './logger';

export class ErrorHandler {

    static logError(error: unknown, context: string): void {

        if (error instanceof Error) {

            logger.error(
                `${context}: ${error.message}\n${error.stack ?? ''}`
            );

        } else {

            logger.error(
                `${context}: ${String(error)}`
            );
        }
    }

    static async handleError(
        error: unknown,
        context: string
    ): Promise<never> {

        this.logError(error, context);

        throw error;
    }
}