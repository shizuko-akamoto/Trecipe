import _ from 'lodash';
import { RootState } from '../index';

export const createLoadingSelector = (actions: Array<string>) => (state: RootState) => {
    return _(actions).some((action) => _.get(state.loading, action));
};
