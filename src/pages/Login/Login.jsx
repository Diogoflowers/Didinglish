import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Register } from "../Register/Register";
import { logarUsuario } from "../../serviceFirestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setIdUser } = useContext(AuthContext);

  return (
    <div className=" bg-[white]  bg-WHITE flex-col items-center justify-center p-4">
      <div className="container-login flex flex-col items-center justify-center  h-screen ">
        <div className="flex justify-start max-w-[400px] w-[100%]">
          <h1 className="text-2xl text-[#263238] font-extrabold mb-[58px]">
            Acesse sua conta
          </h1>
        </div>

        <div className="inputs-login flex flex-col gap-7 max-w-[400px] w-[100%]">
          <div className="flex flex-col ">
            <label className="text-[#4D4D4D] font-medium text-[1rem] mb-3.5">
              E-mail
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#F5F7FA] border-[1px] border-[#535353] rounded-[9px] p-2 focus:border-[#263238] focus:outline-none focus:text-[#263238] text-[#263238]"
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-[#4D4D4D] font-medium text-[1rem] mb-3.5">
              Senha
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#F5F7FA] border-[1px] border-[#535353] rounded-[9px] p-2 focus:border-[#263238] focus:outline-none focus:text-[#263238] text-[#263238]"
            />
          </div>
        </div>
        <div className="flex justify-start max-w-[400px] w-[100%] mt-4">
          <h2 className="text-[#4D4D4D] font-medium text-[1rem] mb-[50px]">
            Não tem uma conta?{" "}
            <span
              className="text-[#ec4899] cursor-pointer"
           
            >
              <a onClick={() => navigate("/register")}>Registre-se</a>
            </span>
          </h2>
        </div>

        <button
          className="max-w-[400px] w-full p-3.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl text-white text-lg font-bold cursor-pointer"
          onClick={() =>
            logarUsuario(email, password, navigate, setToken, setIdUser)
          }
        >
          Entrar
        </button>
      </div>
    </div>
    // <div className="login">
    //   <div className="login-container">
    //     <span>E-mail:</span>
    //     <input
    //       type="email"
    //       placeholder="E-mail"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <span>Password:</span>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button
    //       onClick={() =>
    //         logarUsuario(email, password, navigate, setToken, setIdUser)
    //       }
    //     >
    //       Login
    //     </button>
    //   </div>
    //   <h1>
    //     Não tem uma conta?{" "}
    //     <a onClick={() => navigate("/register")}>Registrar</a>
    //   </h1>
    // </div>
  );
};
