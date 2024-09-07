type ApiError = {
    response?: {
        status: number;
        statusText: string;
        data: {
            message?: string;
            error?: string;
        };
    };
    request?: any;
    message?: string;
};