export interface EnvConfig {
    production: boolean;
    debug: boolean;
}

export const environment: EnvConfig = {
    production: false,
    debug: true
};