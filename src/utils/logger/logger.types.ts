export enum LEVEL {
    HTTP = 'http',
    VERBOSE = 'verbose',
    SILLY = 'silly',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
}

export type LoggerObject = {
    level: LEVEL;
    labelText?: string;
    message: string;
    exitOnError?: boolean;
    silent?: boolean;
};

export enum COLOR {
    BLUE = 'blue',
    RED = 'red',
    GREEN = 'green',
    BLACK = 'black',
    YELLOW = 'yellow',
    CYAN = 'cyan',
    MAGENTA = 'magenta',
    GRAY = 'gray',
    GREY = 'grey',
    WHITE = 'white',
}
