import { useEffect, useState } from "react";
import SearchComponent from "./components";

export default function Search() {
  const [search, setSearch] = useState();
  const [query, setQuery] = useState();
  const [type, setType] = useState("artist");

  useEffect(() => {
    async function fetchSearch() {
      if (query) {
        const fetchURL = await fetch(
          `http://localhost:8000/search?query=${query}&type=${type}`
        );

        setSearch((await fetchURL.json())[type + "s"]);
      }
    }

    fetchSearch();
  }, [query, type]);

  return (
    <div className="flex flex-col p-12 gap-10">
      <div className="flex gap-10 text-stone-950">
        <input
          type="text"
          placeholder="What do you like?"
          onChange={(e) => setQuery(e.target.value)}
          className="w-[70vw] h-6 border rounded-full p-6"
        />

        <select
          onChange={(e) => setType(e.target.selectedOptions[0].value)}
          className="border rounded-full h-12 w-24 p-3"
        >
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="genre">Genre</option>
        </select>
      </div>

      {search ? <SearchComponent props={{ type, search }} /> : <></>}
    </div>
  );
}
