export interface DestWithStatus {
    destUUID: string;
    completed: boolean;
}

/**
 * Trecipe
 * uuid: unique id for Trecipe
 * name: trecipe title
 * owner: owner of the trecipe
 * isPrivate: true if the Trecipe is a private one, false otherwise
 * collaborators: users collaborating on the trecipe
 * image: trecipe image filename
 * destinations: list of destinations in this trecipe and its completion status
 */
export default interface Trecipe {
    uuid: string;
    name: string;
    description: string;
    owner: string;
    isReadOnly?: boolean;
    isPrivate: boolean;
    collaborators: Array<string>;
    image: string | null;
    destinations: Array<DestWithStatus>;
    createdAt: string;
    updatedAt: string;
}
