class HttpFactory {
    private readonly $pattern: string

    constructor(pattern: string) {
        this.$pattern = pattern;
    }

    /**
     * method - GET, POST, PUT
     * URL
     **/
    async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
        return await this.$fetch(process.env.API_URL + this.$pattern + url, {method, body: data, ...extras});
    }
}

export default HttpFactory;