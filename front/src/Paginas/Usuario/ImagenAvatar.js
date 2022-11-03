import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import "../../Cabecera/Cabecera.css";

function ImagenAvatar() {
  const user = useUser();
  const [avatar, setAvatar] = useState();
  console.log("context", user);
  console.log("id", user.data.id);
  const imagenDefecto = (
    <img
      className="avatar"
      src="/avatar-removebg-preview.png"
      alt="imagen avatar"
    />
  );

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://127.0.0.1:3000/usuarios/${user.data.id}/imagen`,
        {
          headers: {
            Authorization: user.data.token,
          },
        }
      );
      const data = await res.json();
      setAvatar(data);
      console.log("nuevoavatar", data);
    })();
  }, [user.data.token, user.data.id]);

  if (!avatar?.data) return imagenDefecto;
  console.log("avatar", avatar);
  return (
    <div>
      {!avatar.data ? (
        <img
          className="avatar"
          src="/avatar-removebg-preview.png"
          alt="imagen avatar"
        />
      ) : (
        <img
          src={`http://127.0.0.1:3000/${avatar.data.imagen}`}
          alt="imagen"
          className="avatar"
        />
      )}
    </div>
  );
}

export default ImagenAvatar;
