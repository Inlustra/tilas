import AuthApi from './authApi';

export default function(httpClient, authHttpClient) {
    return {
        authApi: new AuthApi(httpClient, authHttpClient)
    }
}
