import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../UserContext";

function Denuncia() {
  const user = useUser();
  const { id } = useParams("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [denuncia, setDenuncia] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://127.0.0.1:3000/lugares/${id}`);
      const data = await res.json();
      console.log("denuncia", data);
      setDenuncia(data.data.denuncias_lugar);
    })();
  }, [id]);

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:3000/lugares/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      body: JSON.stringify({
        denuncia: 1,
      }),
    });
    const data = await res.json();
    console.log("despuesDenuncia", data);
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);
      setDenuncia(data.denuncias.denuncias_lugar);
    }
  };
  return (
    <section className="zona_denuncias">
      <p>
        <span>{denuncia}</span> denuncias realizadas
      </p>
      <button onClick={handleClick}>Denuncia este problema</button>
      {status === "error" && <p className="api">{message}</p>}
      {!user && "Debes registrarte para poder denunciar problemas."}
    </section>
  );
}

export default Denuncia;
