/**
 * DTO for creating new trecipes
 */
export default interface CreateNewTrecipeDTO {
    name: string;
    description: string;
    isPrivate: boolean;
}
