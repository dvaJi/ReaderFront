import Release from './../models/release';
import Chapter from '../models/chapter';

export interface ChapterState extends Chapter {
    loading: boolean;
}

export const initializeChapterState = function () {
    return {
        loading: true,
    };
};

export interface HomeState {
    releases: ChapterState[];
    loading: boolean;
    error: boolean;
}

export const intializeHomeState = function () {
    return {
        loading: false,
        error: false,
    };
};
