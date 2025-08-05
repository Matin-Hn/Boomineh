import { useEffect, useState } from "react";
import {
  fetchPaintings,
  deletePainting,
} from "../api/paintingsAPI";

const PaintingsList = () => {
  const [paintings, setPaintings] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchPaintings().then(setPaintings);
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure?");
    if (ok && token) {
      const success = await deletePainting(id, token);
      if (success) {
        setPaintings((prev) => prev.filter((p) => p.id !== id));
      }
    }
  };

  return (
    <div>
      <h2>All Paintings</h2>
      {paintings.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <img src={`http://localhost:8000${p.image}`} alt={p.title} width="200" />
          <p>{p.description}</p>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PaintingsList;
