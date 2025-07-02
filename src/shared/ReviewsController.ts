import { Allow, BackendMethod, remult } from "remult";
import { Review } from "./review";

export class ReviewsController {
    @BackendMethod({ allowed: Allow.everyone })
    static async getReviewsByMovieId(movie_id: number) {
        const repo = remult.repo(Review);
        return repo.find({
            where: { movie_id },
            orderBy: { created_at: "desc" }
        })
    }

    @BackendMethod({ allowed: Allow.everyone })
    static async addReview(movie_id: number, title: string, description: string, rating: number, country: string) {
        const user = remult.user;

        if (!title || !description || !rating || !country)
            throw new Error("Tüm alanlar zorunludur");

        if (rating < 1 || rating > 10)
            throw new Error("Puan 1 ile 10 arasında olmalıdır");

        const repo = remult.repo(Review);

        return await repo.insert({
            movie_id,
            title,
            description,
            rating,
            country,
            user_id: parseInt(user.id)
        });
    }
}