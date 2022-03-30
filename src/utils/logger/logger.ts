import { createLogger, format, transports } from 'winston';
import { COLOR, LEVEL } from './logger.types';

const { combine, label, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()} - ${label}]: ${message}`;
});

export default class Logger {
    public static notify(level: LEVEL, labelText: string, message: string, exitOnError = false, silent = false): void {
        try {
            const logger = createLogger({
                level: level,
                format: combine(label({ label: labelText }), timestamp(), myFormat),
                transports: [new transports.Console()],
                exitOnError: exitOnError,
                silent: silent,
            });

            logger.log({ private: true, level: level, message: message });
        } catch (err) {
            throw err;
        }
    }

    public static decorateMessage(message: string, color: COLOR, character = '#'): void {
        try {
            const logger = createLogger({
                level: LEVEL.INFO,
                format: printf(({ message }) => {
                    return `${message}`;
                }),
                transports: [
                    new transports.Console({
                        format: combine(colorize({ all: true, colors: { info: color } })),
                    }),
                ],
            });

            const maxLengthDisplay = 131;
            let countPaddingContent = 10;
            let spaceToContent = countPaddingContent - 1;
            let decorateString = character.repeat(message.length + countPaddingContent * 2);
            let spaceString = ' '.repeat(spaceToContent);
            if (message.length < maxLengthDisplay) {
                logger.log({ level: LEVEL.INFO, message: decorateString });
                logger.log({
                    level: LEVEL.INFO,
                    message: `${character}${spaceString}${message}${spaceString}${character}`,
                });
                logger.log({ level: LEVEL.INFO, message: decorateString });
            } else {
                // TODO: Need enhance this logic
                decorateString = character.repeat(maxLengthDisplay);
                let itemString = '';
                const numberCharEachLine = 110;
                let index = 0;
                const arrMatches = message.match(/[(\w)(.,&*)]+/gi) as RegExpMatchArray;
                logger.log({ level: LEVEL.INFO, message: decorateString });
                while (index < arrMatches.length) {
                    if (itemString.length < numberCharEachLine) {
                        itemString += `${arrMatches[index]} `;
                    } else {
                        logger.log({
                            level: LEVEL.INFO,
                            message: `${character}${spaceString}${itemString}${' '.repeat(
                                maxLengthDisplay - (countPaddingContent + itemString.length + 1)
                            )}${character}`,
                        });
                        itemString = `${arrMatches[index]} `;
                    }
                    index += 1;
                }
                logger.log({
                    level: LEVEL.INFO,
                    message: `${character}${spaceString}${itemString}${' '.repeat(
                        maxLengthDisplay - (countPaddingContent + itemString.length + 1)
                    )}${character}`,
                });
                logger.log({ level: LEVEL.INFO, message: decorateString });
            }
        } catch (err) {
            throw err;
        }
    }
}
