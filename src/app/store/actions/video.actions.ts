export class FetchVideos {
    static readonly type = '[Video] Fetch';
    constructor(public channelId: string) { }
}

export class SortVideos {
    static readonly type = '[Video] Sort';
    constructor(public payload: string[]) { }
}

export class EditVideoNote {
    static readonly type = '[Video] Edit Note';
    constructor(public videoId: string, public note: string) { }
}
