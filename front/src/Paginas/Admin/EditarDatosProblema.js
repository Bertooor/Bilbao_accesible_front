import { useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../UserContext";
import useFetch from "fetch-suspense";

function EditarDatosProblema() {
  const user = useUser();
  const { id } = useParams();
  const problema = useFetch("http://127.0.0.1:3000/lugares/" + id);

  const [title, setTitle] = useState(problema.data.título);
  const [city, setCity] = useState(problema.data.ciudad);
  const [distric, setDistric] = useState(problema.data.barrio);
  const [description, setDescription] = useState(problema.data.descripción);

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("city", city);
    formData.append("distric", distric);
    formData.append("description", description);

    const res = await fetch("http://127.0.0.1:3000/lugares/" + id, {
      method: "PUT",
      headers: {
        Authorization: user.data.token,
      },
      body: formData,
    });
    const data = await res.json();
    console.log("boolean", data);
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);
      setTitle("");
      setCity("");
      setDistric("");
      setDescription("");
    }
  };

  return (
    <section className="nuevo_problema">
      <h2>Editar datos problema</h2>
      <form onSubmit={handleSubmit} className="form_nuevo">
        <label>
          <span>Título</span>
          <input
            required
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Ciudad</span>
          <input
            required
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          <span>Barrio</span>
          <input
            required
            name="distric"
            value={distric}
            onChange={(e) => setDistric(e.target.value)}
          />
        </label>
        <label>
          <span>Descripción</span>
          <textarea
            rows="20"
            cols="100"
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button>Sustituir</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default EditarDatosProblema;
