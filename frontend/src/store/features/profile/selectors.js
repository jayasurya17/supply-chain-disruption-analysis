import * as R from 'ramda';

const user = state => R.pathOr({}, ['profile', 'user'], state);
const route = state => R.pathOr('', ['profile', 'route'], state);

const selectors = {
    route,
    user,
};

export default selectors;