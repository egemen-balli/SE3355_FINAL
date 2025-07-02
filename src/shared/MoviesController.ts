import { Allow, BackendMethod, remult } from "remult";
import { Movie } from "./movie";
import { Review } from "./review";

export class MoviesController {
    @BackendMethod({ allowed: true })
    static async searchMovies(query: string) {
        const movieRepo = remult.repo(Movie);

        return movieRepo.find({
            where: {
                title: { $contains: query.toLowerCase() },
            },
            limit: 10,
            orderBy: { title: "asc" },
        });
    }

    @BackendMethod({ allowed: Allow.everyone })
    static async getMovieById(id: number) {
        const repo = remult.repo(Movie);
        return repo.findId(id);
    }

    @BackendMethod({ allowed: Allow.everyone })
    static async calculatePopularityForAllMovies() {
        const movieRepo = remult.repo(Movie);
        const reviewRepo = remult.repo(Review);

        const allMovies = await movieRepo.find();

        for (const movie of allMovies) {
            const reviews = await reviewRepo.find({ where: { movie_id: movie.id } });
            const avgRating = reviews.length > 0 ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;
            const reviewCount = reviews.length;

            const score = (avgRating * 30) + (reviewCount * 10);

            await movieRepo.save({ ...movie, popularity: score });
        }
    }

    @BackendMethod({ allowed: Allow.everyone })
    static async getTopTen() {
        const repo = remult.repo(Movie);
        const topPopularMovies = await repo.find({
            orderBy: { popularity: "desc" },
            limit: 10
        });
        return topPopularMovies;
    }
}