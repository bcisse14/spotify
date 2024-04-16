import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GenreDetails() {
  const [genre, setGenre] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const genreResponse = await fetch(`http://localhost:8000/genres/${id}`);
      const genreData = await genreResponse.json();
      setGenre(genreData);

      const albumsUrl = await fetch(`http://localhost:8000/albums`);
      const albumsData = await albumsUrl.json();
      setAlbums(albumsData);
      setLoad(true);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {load ? (
        <div className="flex flex-wrap gap-20 p-12">
          {genre.albums.map((genre) => {
            const album = albums.find((album) => {
              return album.id === genre;
            });

            if (album.name.length > 25) {
              album.name = album.name.substring(0, 25) + "...";
            }

            return (
              <Link key={genre} to={"/albums/" + album.id}>
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-52 hover:scale-110"
                />

                <h3>{album.name}</h3>
              </Link>
            );
          })}
        </div>
      ) : (
        <h3>Chargement...</h3>
      )}
    </>
  );
}
