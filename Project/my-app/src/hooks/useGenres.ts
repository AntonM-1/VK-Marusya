import { useEffect, useState } from "react";
import { getGenres } from "../api/genres/getGenres";
import { getMoviesByGenre } from "../api/movies/getMoviesByGenre";
import { genreNames } from "../utils/genres";
import type { Genre } from "../types/Genre";

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const rawGenres = await getGenres();
        const usedImages = new Set<string>();

        const results = await Promise.allSettled(
          rawGenres.map(async (id) => {
            try {
              const movies = await getMoviesByGenre(id, 10);
              const unique = movies.find(
                (m) => m.backdropUrl && !usedImages.has(m.backdropUrl)
              );
              if (unique?.backdropUrl) usedImages.add(unique.backdropUrl);
              return {
                id,
                name: genreNames[id] ?? id,
                image: unique?.backdropUrl ?? `http://dummyimage.com/1000`, 
              };
            } catch {
              return {
                id,
                name: genreNames[id] ?? id,
                image: `http://dummyimage.com/1000`,
              };
            }
          })
        );

        const enriched = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value);

        setGenres(enriched);
      } catch (err) {
        setError("Не удалось загрузить список жанров");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, isLoading, error };
};

export default useGenres;