export interface CreateImageResponse {
    data: Data;
    meta: Meta;
}

export interface Data {
    base64:   string;
    mimeType: string;
}

export interface Meta {
    remainingToday: number;
    dailyLimit:     number;
}
