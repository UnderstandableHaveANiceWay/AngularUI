export interface ISightImage{
    id: number;
    name: string;
    fileUrl: string;
    type: string;
    sightId: number;
    fromServer: boolean | undefined;
}