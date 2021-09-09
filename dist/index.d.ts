declare const _default: {
    getQueryString: (name: string) => string;
    upper: typeof import("./utils/utils").upper;
    wxLogin: (appid: string | number, baseUrl: string, url?: string, state?: number) => void;
    registerWXConfig: (debug: boolean | undefined, data: Record<string, any>, jsApiList?: string[]) => void;
    updateAppMessageShareData: (data: {
        title: string;
        desc: string;
        link: string;
        imgUrl: string;
    }) => Promise<unknown>;
    updateTimelineShareData: (data: {
        title: string;
        desc: string;
        link: string;
        imgUrl: string;
    }) => Promise<unknown>;
    chooseImage: (count: number, sizeType: string[], sourceType: string[]) => Promise<unknown>;
    uploadImage: (localId: string) => Promise<unknown>;
    chooseUploadImage: (count: number, sizeType: string[], sourceType: string[]) => Promise<Record<string, any>[]>;
};
export default _default;
