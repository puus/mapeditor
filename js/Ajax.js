class Ajax {

    /**
     * Constructor
     *
     * Initialize a new AJAX Helper
     */
    constructor(method, url, data, callback) {

        this.DONE = 4;
        this.OK = 200;

        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = this._onXhrReadyStateChange.bind(this);
        this.method = method;
        this.url = url;
        this.setRequestData(data);
        this.callback = callback;
    }

    _onXhrReadyStateChange() {

        if (this.xhr.readyState == this.DONE) {
            if (this.xhr.status == this.OK) {
                if (typeof this.beforeCallback === 'function') { this.beforeCallback(); }
                this.callback(this.xhr.responseText);
            }
        }
    }

    setRequestData(data) {

        this.requestData = this.formatRequestData(data);
    }

    formatRequestData(data) {

        var response = "";
        for(var index in data) {
            response += index + '=' + data[index] + '&';
        }
        response = response.substring(0, response.length - 1);

        return response;
    }

    send() {

        if (typeof this.beforeOpen === 'function') { this.beforeOpen(); }
        this.xhr.open(this.method, this.url);
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (typeof this.beforeSend === 'function') { this.beforeSend(); }
        this.xhr.send(this.requestData || null);
    }
}

export default Ajax;
