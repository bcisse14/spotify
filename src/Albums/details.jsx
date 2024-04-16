import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();
  const audio = useRef(null);

  useEffect(() => {
    async function fetchDetails() {
      const data = await fetch("http://localhost:8000/albums/" + id);
      const details = await data.json();
      setAlbum(details.album);
      setTracks(details.tracks);
    }

    fetchDetails();
  }, [id]);

  if (album) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center gap-6">
          <img src={album.cover} alt={album.name} className="w-96" />
          <h3 className="font-bold text-xl">{album.name}</h3>
          <p className="text-sm">{album.description}</p>

          {tracks.map((track) => {
            return (
              <div className="flex flex-col items-center gap-3" key={track.id}>
                <p>{track.name}</p>

                <audio ref={audio} controls className="w-[60vw]">
                  <source src={track.mp3} />
                </audio>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <div>Chargement...</div>;
}
