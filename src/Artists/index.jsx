import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function List() {
  const [artists, setArtists] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchArtistsNames = async () => {
      const url = await fetch("http://localhost:8000/artists");
      const artist = await url.json();
      setArtists(artist);
      setLoad(true);
    };
    fetchArtistsNames();
  }, []);

  return (
    <>
      {load ? (
        <div className="flex flex-wrap gap-20">
          {artists.map((artist) => {
            return (
              <Link
                to={`/artist_details/${artist.id}`}
                key={artist.id}
                className="p-4 hover:scale-110"
              >
                <div>
                  {artist.name}
                  <img src={artist.photo} alt={artist.name} className="w-52" />
                </div>
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
