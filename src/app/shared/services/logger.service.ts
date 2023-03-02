import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


export abstract class Logger {
    verbose: any;
    info: any;
    warn: any;
    error: any;

    abstract invokeConsoleMethod(
        type: 'debug' | 'info' | 'warn' | 'error',
        args?: any
    ):  void;
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService implements Logger {

    isProd = environment.production;
    isDebug = environment.debug;
    noop = (): any => undefined;

    constructor() {}

    get verbose()  {
        if (!this.isProd && this.isDebug) {
            return console.debug.bind(console);
        } else {
            return this.noop;
        }
    }

    get info()  {
        if (!this.isProd) {
            return console.info.bind(console);
        } else {
            return this.noop;
        }
    }

    get warn()  {
        if (!this.isProd) {
            return console.warn.bind(console);
        } else {
            return this.noop;
        }
    }

    get error()  {
        return console.error.bind(console);
    }

    invokeConsoleMethod = (type: 'debug' | 'info' | 'warn' | 'error', args?: any): void => {
        const logFn: Function = (console)[type] || console.log || this.noop;
        logFn.apply(console, [args]);
    }
}