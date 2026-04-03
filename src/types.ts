export interface PreviewItem {
    key: string;
    type: string;
    isExpandable: boolean;
}

export interface Summary {
    type: string;
    count: number;
    preview: PreviewItem[];
}

export interface PreviewItem {
    key: string;
    type: string;
    isExpandable: boolean;
    value?: string;
}
