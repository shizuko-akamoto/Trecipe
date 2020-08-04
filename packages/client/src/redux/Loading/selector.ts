import _ from 'lodash';
import { RootState } from '../index';

/**
 * Returns true if any of the action given is under REQUEST (loading) state
 */
export const createLoadingSelector = (actions: Array<string>) => (state: RootState) => {
    return _(actions).some((action) => _.get(state.loading, action));
};
