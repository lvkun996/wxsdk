declare type TShareData = {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
};
declare const _default: {
    wxLogin: (appid: string | number, baseUrl: string, url?: string, state?: number) => void;
    registerWXConfig: (debug: boolean | undefined, data: Record<string, any>, jsApiList?: string[]) => void;
    updateAppMessageShareData: (data: TShareData) => Promise<unknown>;
    updateTimelineShareData: (data: TShareData) => Promise<unknown>;
    chooseImage: (count: number, sizeType: string[], sourceType: string[]) => Promise<unknown>;
    uploadImage: (localId: string) => Promise<unknown>;
    chooseUploadImage: (count: number, sizeType: string[], sourceType: string[]) => Promise<Record<string, any>[]>;
};
export default _default;
