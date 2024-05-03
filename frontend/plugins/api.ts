
import { defineNuxtPlugin } from '#app';
import AuthModule from '~~/repository/modules/auth';

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    auth: AuthModule
}

export default defineNuxtPlugin((nuxtApp) => {

    /** create a new instance of $fetcher with custom option */
    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
        auth: new AuthModule(),
    };

    return {
        provide: {
            api: modules,
        },
    };
});