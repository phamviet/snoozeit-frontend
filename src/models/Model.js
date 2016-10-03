import extend from 'lodash/extend';

class Model {
    constructor(obj) {
        extend(this, obj);
        this._obj = obj;
    }

    getData() {
        return this._obj;
    }
}

export default Model
