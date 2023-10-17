import { Video } from "@shared/models";

// export namespace Videos {
    export class EditNote {
        static readonly type = '[Video] Edit Note';
        constructor(
            public payload: Video
        ) {

        }
    }

    export class SortVideos {
        static readonly type = '[Videos] Sort Videos';
        constructor(
            public payload: string[]
        ) {

        }
    }

    export namespace Videos {
        export class FetchVideos {
            static readonly type = '[Videos] Fetch Videos';
            constructor(
                public payload: string
            ) {

            }
        }
    }
// }