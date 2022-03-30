import Logger from '../../utils/logger/logger';
import { COLOR, LEVEL } from '../../utils/logger/logger.types';

describe('Test logger', () => {
    beforeEach(() => {
        Logger.notify(LEVEL.INFO, 'Test case running', 'Start the test case');
    });

    it('Test case 2', () => {
        Logger.notify(LEVEL.INFO, 'webDriver', 'Logger info with console and pretty format');
        Logger.notify(LEVEL.ERROR, 'getInstance', 'Logger error with console and pretty format');
        Logger.notify(LEVEL.WARN, 'elementFinder', 'Logger warning with console and pretty format');
        Logger.notify(LEVEL.VERBOSE, 'driverFactory', 'Logger verbose with console and pretty format');
    });

    it('Test case 3', () => {
        Logger.notify(LEVEL.INFO, 'webDriver 3', 'Logger info with console and pretty format');
        Logger.notify(LEVEL.ERROR, 'getInstance 3', 'Logger error with console and pretty format');
        Logger.notify(LEVEL.WARN, 'elementFinder 3', 'Logger warning with console and pretty format');
        Logger.notify(LEVEL.VERBOSE, 'driverFactory 3', 'Logger verbose with console and pretty format');
    });

    it.only('Test case 4', () => {
        Logger.decorateMessage(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            COLOR.GREEN
        );
    });
});
