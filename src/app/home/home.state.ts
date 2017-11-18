import Release from './../models/release';

export interface ChapterState extends Release {
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
