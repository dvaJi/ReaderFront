import { EntityState, createEntityAdapter } from '@ngrx/entity';
import Chapter from '../models/chapter';
import { ChapterMock } from '../../testing/mock/chapter-mock';
import { HomeState, ChapterState, initializeChapterState } from './home.state';
import * as actions from './home.action';
import { createFeatureSelector } from '@ngrx/store';

export const chapterAdapter = createEntityAdapter<Chapter>();
export interface State extends EntityState<Chapter> {
    loading: boolean;
}

export const initialState: State = chapterAdapter.getInitialState(ChapterMock.generateEmptyMockChapter());


export function HomeReducer(state: State = initialState, action: actions.All) {
    console.log(state, action);
    switch (action.type) {
        case actions.GET_LATEST_RELEASES:
            return { ...state, loading: true };
        case actions.GET_LATEST_RELEASES_SUCCESS:
            if (state.entities.toString() === 'loading') {
                return chapterAdapter.addAll(action.payload, state);
            } else {
                return chapterAdapter.addMany(action.payload, state);
            }
        case actions.GET_LATEST_RELEASES_ERROR:
            return { ...state };
        default:
            return state;
    }
}

export const getChapterState = createFeatureSelector<State>('home');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = chapterAdapter.getSelectors(getChapterState);
