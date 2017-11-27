import { Observable } from 'rxjs';

class ApiClient {

    apiToken = null;

    setApiToken(token) {
        this.apiToken = token;
    }

    mergeHeaders(headers = {}) {
        return this.apiToken
            ? Object.assign(headers, { Authorization: 'Bearer ' + this.apiToken })
            : headers;
    }

    get(url, headers) {
        return Observable.ajax.get(url, this.mergeHeaders(headers));
    }

    put(url, body, headers) {
        return Observable.ajax.put(url, body, this.mergeHeaders(headers));
    }

    post(url, body, headers) {
        return Observable.ajax.post(url, body, this.mergeHeaders(headers));
    }

    patch(url, body, headers) {
        return Observable.ajax.patch(url, body, this.mergeHeaders(headers));
    }

    delete(url, headers) {
        return Observable.ajax.delete(url, this.mergeHeaders(headers));
    }
}

export default ApiClient;
