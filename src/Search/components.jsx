import { Link } from "react-router-dom";

export function Artists({ props }) {
  return (
    <div className="flex flex-wrap gap-20">
      {props.map((e) => {
        if (e.name.length > 25) {
          e.name = e.name.substring(0, 25) + "...";
        }

        return (
          <Link
            className="hover:scale-110"
            key={e.name}
            to={"/artist_details/" + e.id}
          >
            <img src={e.photo} alt={e.name} />

            <h3>{e.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export function Genres({ props }) {
  return (
    <div className="flex flex-wrap gap-20">
      {props.map((e) => {
        return (
          <Link to={"/genres/" + e.id} key={e.id}>
            <h3>{e.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export function Albums({ props }) {
  return (
    <div className="flex flex-wrap gap-20">
      {props.map((e) => {
        if (e.name.length > 25) {
          e.name = e.name.substring(0, 25) + "...";
        }

        return (
          <Link to={"/albums/" + e.id}>
            <img src={e.cover} alt={e.name} />

            <h3>{e.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export default function SearchComponent({ props }) {
  const { type, search } = props;

  if (type === "artist") {
    return <Artists props={search} />;
  }

  if (type === "genre") {
    return <Genres props={search} />;
  }

  if (type === "album") {
    return <Albums props={search} />;
  }
}
