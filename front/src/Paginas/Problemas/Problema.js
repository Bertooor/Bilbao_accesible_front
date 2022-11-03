import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../UserContext";
import Denuncia from "./Denuncia";

function Problema() {
  const user = useUser();
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const [problema, setProblema] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://127.0.0.1:3000/lugares/${id}`);
      const data = await res.json();
      console.log("data", data);
      setMessage(data);
      setStatus(data);
      setProblema(data);
    })();
  }, [id]);

  return (
    <section className="problema">
      {problema && (
        <article>
          <h2>{problema.data.título}</h2>
          <p>
            Barrio: <span>{problema.data.barrio}</span>
          </p>
          <section>
            {problema.data.imagenes.map((pro, index) => (
              <img
                src={`http://127.0.0.1:3000/${pro.imagen}`}
                alt="imagen"
                key={index}
              />
            ))}
          </section>
          <p className="descripcion">
            <pre>{problema.data.descripción}</pre>
          </p>
          <Denuncia />
          <p className="api">
            {!user && "Debes registrarte para poder denunciar problemas."}
          </p>
          <p className="problema_resuelto">
            {problema.data.problema_resuelto === 0
              ? "Problema NO resuelto"
              : "Problema resuelto"}
          </p>
          {status === "error" && <p className="api">{message}</p>}
          {status === "ok" && <p className="api">{message}</p>}
        </article>
      )}
    </section>
  );
}

export default Problema;
