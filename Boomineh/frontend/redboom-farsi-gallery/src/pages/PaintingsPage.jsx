import { useEffect, useState } from "react";
import {
  fetchPaintings,
  deletePainting,
  getPainting,
} from "../api/paintingsAPI";
import PaintingForm from "../components/PaintingForm";

const PaintingsPage = () => {
  const [paintings, setPaintings] = useState([]);
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("access");

  const loadPaintings = () => {
    fetchPaintings().then(setPaintings);
  };

  useEffect(() => {
    loadPaintings();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete?");
    if (ok) {
      await deletePainting(id, token);
      loadPaintings();
    }
  };

  const handleEdit = async (id) => {
    const painting = await getPainting(id);
    setEditing(painting);
  };

  return (
    <div>
      <PaintingForm
        token={token}
        painting={editing}
        onSuccess={() => {
          setEditing(null);
          loadPaintings();
        }}
      />
      <hr />
      <h2>Paintings</h2>
      {paintings.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <img
            src={`http://localhost:8000${p.image}`}
            alt={p.title}
            width="200"
          />
          <p>{p.description}</p>
          <button onClick={() => handleEdit(p.id)}>Edit</button>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PaintingsPage;
