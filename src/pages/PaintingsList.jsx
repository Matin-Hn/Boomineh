import { useEffect, useState } from "react";
import { fetchPaintings } from "../api/paintingsAPI";

const PaintingsList = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    fetchPaintings().then(setPaintings);
  }, []);

  return (
    <div>
      <h2>All Paintings</h2>
      {paintings.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <img src={`http://localhost:8000${p.image}`} alt={p.title} width="200" />
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PaintingsList;
