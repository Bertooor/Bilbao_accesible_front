import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../UserContext";

function BorrarImagen() {
  const user = useUser();

  const [imagenes, setImagenes] = useState([]);
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://127.0.0.1:3000/lugares/${id}`);
      const data = await res.json();
      console.log("data", data);
      setImagenes(data.data.imagenes);
    })();
  }, [id]);

  const borrandoImagen = async (imgId) => {
    const res = await fetch(
      `http://127.0.0.1:3000/lugares/${id}/imagenes/${imgId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: user.data.token,
        },
      }
    );

    const data = await res.json();
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);

      setImagenes(imagenes.filter((imagen) => imagen.id !== imgId));
    }
  };

  return (
    <section>
      {imagenes.length ? (
        <div className="imagenes">
          {imagenes.map((pro) => (
            <div key={pro.id} className="imagenes_button">
              <img src={`http://127.0.0.1:3000/${pro.imagen}`} alt="imagen" />
              <button
                onClick={() => {
                  borrandoImagen(pro.id);
                }}
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay imágenes</p>
      )}
      {status === "error" && <p className="api">{message}</p>}
      {status === "ok" && <p className="api">{message}</p>}
    </section>
  );
}

export default BorrarImagen;