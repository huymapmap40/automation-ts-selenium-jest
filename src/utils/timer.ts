export default class Timer {
    private _startTime = 0;

    public startClock(): void {
        try {
            if (this._startTime == null) {
                this._startTime = new Date().getTime();
            } else {
                throw new Error('The timer had been started already !!');
            }
        } catch (err) {
            throw err;
        }
    }

    public getElapsedTime(): number {
        try {
            const currentTime = new Date().getTime();
            return currentTime - this._startTime;
        } catch (err) {
            throw err;
        }
    }

    public getElapsedTimeInSecond(): number {
        try {
            return (new Date().getTime() - this._startTime) / 1000;
        } catch (err) {
            throw err;
        }
    }

    public getRemainingTimeInSecond(timeoutInSecond: number): number {
        try {
            return timeoutInSecond - this.getElapsedTimeInSecond();
        } catch (err) {
            throw err;
        }
    }
}
