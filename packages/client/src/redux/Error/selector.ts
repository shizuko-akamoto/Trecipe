import _ from 'lodash';
import { RootState } from '../index';

/**
 * Returns the first error messages for actions
 * We assume when any request fails on a page that requires multiple API calls, we shows the first error
 * @param actions: action of interest
 */
export const createErrorMessageSelector = (actions: Array<string>) => (state: RootState) => {
    return (
        _(actions)
            .map((action) => _.get(state.error, action))
            .compact()
            .first() || ''
    );
};
