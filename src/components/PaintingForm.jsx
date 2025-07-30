import { useState, useEffect } from "react";
import { createPainting, updatePainting } from "../api/paintingsAPI";

const PaintingForm = ({ token, painting = null, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (painting) {
      setTitle(painting.title);
      setDescription(painting.description);
    }
  }, [painting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    if (image) data.image = image;

    try {
      if (painting) {
        await updatePainting(painting.id, data, token);
      } else {
        await createPainting(data, token);
      }
      onSuccess?.();
    } catch (err) {
      alert("Error submitting painting");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{painting ? "Edit Painting" : "Add New Painting"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">{painting ? "Update" : "Create"}</button>
    </form>
  );
};

export default PaintingForm;
