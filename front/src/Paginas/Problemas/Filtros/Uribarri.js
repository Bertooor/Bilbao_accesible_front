import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Uribarri() {
  const [problema, setProblema] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://127.0.0.1:3000/lugares`);
      const data = await res.json();
      setProblema(data);
    })();
  }, []);

  return (
    <section>
      {problema?.data.lugares
        .filter((prob) => prob.barrio === "Uribarri")
        .map((pro) => (
          <Link to={`/problemas/${pro.id}`} key={pro.id}>
            <div className="tarjeta_problemas">
              <h3>{pro.título}</h3>
              <img src={`http://127.0.0.1:3000/${pro.portada}`} alt="imagen" />
              <h4>{pro.barrio}</h4>
            </div>
          </Link>
        ))}
    </section>
  );
}

export default Uribarri;
