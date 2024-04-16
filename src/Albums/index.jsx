import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState();

  useEffect(() => {
    const res = fetch("http://localhost:8000/albums");

    res.then(async (caca) => {
      setAlbums(await caca.json());
    });
  }, []);

  if (albums) {
    return (
      <div className="flex flex-wrap gap-20">
        {albums.map((album) => {
          return (
            <Link
              to={"/albums/" + album.id}
              className="p-4 hover:scale-110"
              key={album.id}
            >
              <img className="w-52" alt={album.name} src={album.cover} />

              <h3>{album.name}</h3>
            </Link>
          );
        })}
      </div>
    );
  }

  return <div>Chargement...</div>;
}

export default Albums;
