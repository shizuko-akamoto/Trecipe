export interface DestWithStatus {
    destUUID: string;
    completed: boolean;
}

export default interface Trecipe {
    uuid: string;
    name: string;
    description: string;
    owner: string;
    isPrivate: boolean;
    collaborators: Array<string>;
    image: string;
    destinations: Array<DestWithStatus>;
}
