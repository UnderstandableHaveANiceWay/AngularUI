import { IUser } from "../app-user";

export interface IReview {
    id: number;

    text: string;

    rating: number;

    userId: number;

    user: IUser;

    sightId: number;
}