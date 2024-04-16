import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ArtistDetails() {
  const { id } = useParams();
  const [albums, setAlbums] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchAlbumsNames = async () => {
      const url = await fetch(`http://localhost:8000/albums/artist/${id}`);
      const album = await url.json();
      setAlbums(album);
      setLoad(true);
    };
    fetchAlbumsNames();
  }, [id]);

  return (
    <>
      {load ? (
        <div className="flex flex-wrap gap-20">
          {albums.map((album) => (
            <Link
              to={`../albums/${album.id}`}
              key={album.id}
              className="p-4 hover:scale-110"
            >
              <div>
                <img src={album.cover} alt={album.name} className="w-52" />
              </div>
              <h3>{album.name}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <h3>Chargement...</h3>
      )}
    </>
  );
}
