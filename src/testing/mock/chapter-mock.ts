import Chapter from '../../app/models/chapter';

export class ChapterMock {

    static generateEmptyMockChapter() {
        const ids: Array<string> = [];
        for (let index = 1; index <= 24; index++) {
            ids.push(index.toString());

        }
        return {
            ids: ids,
            entities: 'loading',
            loading: true
        };
    }
}
