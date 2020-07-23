import Trecipe from '../../../../shared/models/trecipe';

export type TrecipeState = {
    trecipe: Trecipe | undefined;
};

export const initialState: TrecipeState = {
    trecipe: undefined,
};

export enum TrecipeActionTypes {
    LOAD_TRECIPE = '@trecipe/LOAD_TRECIPE',
    UPDATE_TRECIPE = '@trecipe/UPDATE_TRECIPE',
}
