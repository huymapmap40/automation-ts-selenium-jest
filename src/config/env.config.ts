const getConfigParam = (): string => {
    if (process.env.BROWSER) {
        return process.env.BROWSER;
    } else {
        throw new Error('Please declare BROWSER to run test. Example: BROWSER=chrome, ...');
    }
};
