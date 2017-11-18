import Chapter from '../models/chapter';
import { ChapterMock } from '../../testing/mock/chapter-mock';
import { HomeState, ChapterState, initializeChapterState } from './home.state';
import * as HomeActions from './home.action';

export type Action = HomeActions.All;

const defaultReleasesStates: ChapterState[] = [
    { ...ChapterMock.generateEmptyMockChapter(), ...initializeChapterState() },
    { ...ChapterMock.generateEmptyMockChapter(), ...initializeChapterState() },
    { ...ChapterMock.generateEmptyMockChapter(), ...initializeChapterState() },
    { ...ChapterMock.generateEmptyMockChapter(), ...initializeChapterState() },
    { ...ChapterMock.generateEmptyMockChapter(), ...initializeChapterState() }
];

const initialState: HomeState = {
    releases: defaultReleasesStates,
    loading: false,
    error: false
};

export function HomeReducer(state: HomeState = initialState, action: Action): HomeState {

    switch (action.type) {
        case HomeActions.GET_LATEST_RELEASES: {
            return { ...state, loading: true };
        }
        case HomeActions.GET_LATEST_RELEASES_SUCCESS: {
            return {
                ...state,
                releases: [
                    ...action.payload
                ],
                loading: false
            };
        }
        case HomeActions.GET_LATEST_RELEASES_ERROR: {
            return {
                ...state,
                releases: [
                    ...state.releases
                ]
            };
        }
        default: {

            return state;
        }
    }
}
