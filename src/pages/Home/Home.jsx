import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import iconHome from "../../imgs/icon-home.png";
import iconLogout from "../../imgs/icon-logout.png";
import iconAdd from "../../imgs/mais-1.png";
import { FaBookOpen } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { CardDrag } from "../../components/CardDrag";
import { AuthContext } from "../../contexts/AuthProvider";
import {
  atualizarOrdem,
  excluirDadosUsuario,
  inserirDadosUsuario,
  pegarDadosUsuario,
} from "../../serviceFirestore";
import "../../styles.css";

export const Home = () => {
  const navigate = useNavigate();
  const { deslogar, idUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState("");
  const [modal, setModal] = useState(false);

  const [nameIdDropModal, setNameIdDropModal] = useState(null);
  const handleLogout = () => {
    deslogar();
    navigate("/");
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (idUser) {
        const userData = await pegarDadosUsuario(idUser);
        setData(userData.droppable1);
        setData2(userData.droppable2);
        setData3(userData.droppable3);
      }
    };

    carregarDadosUsuario();
  }, [idUser, inserirDadosUsuario, setData, setData2, setData3]);
  const [titleDrop, setTitleDrop] = useState([
    { title: "Starting", id: "droppable1", drop: data },
    { title: "Learning", id: "droppable2", drop: data2 },
    { title: "Dominating", id: "droppable3", drop: data3 },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    const getItems = (droppableId) => {
      switch (droppableId) {
        case "droppable1":
          return data || [];
        case "droppable2":
          return data2 || [];
        case "droppable3":
          return data3 || [];
        default:
          return [];
      }
    };

    const setItems = (droppableId, newItems) => {
      switch (droppableId) {
        case "droppable1":
          setData(newItems);
          // inserirDadosUsuario(
          //   idUser,
          //   word,
          //   answer,
          //   setData,
          //   data,
          //   "droppable1"
          // );
          break;
        case "droppable2":
          setData2(newItems);
          // inserirDadosUsuario(
          //   idUser,
          //   word,
          //   answer,
          //   setData2,
          //   data,
          //   "droppable2"
          // );
          break;
        case "droppable3":
          setData3(newItems);
          // inserirDadosUsuario(
          //   idUser,
          //   word,
          //   answer,
          //   setData3,
          //   data,
          //   "droppable3"
          // );
          break;
        default:
          break;
      }
    };

    if (sourceDroppableId === destinationDroppableId) {
      const items = Array.from(getItems(sourceDroppableId));
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setItems(sourceDroppableId, items);
      atualizarOrdem(idUser, items, result.source.droppableId);
    } else {
      const sourceItems = Array.from(getItems(sourceDroppableId));
      const destinationItems = Array.from(getItems(destinationDroppableId));
      const [movedItem] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, movedItem);
      setItems(sourceDroppableId, sourceItems);
      atualizarOrdem(idUser, sourceItems, sourceDroppableId);
      setItems(destinationDroppableId, destinationItems);
      atualizarOrdem(idUser, destinationItems, destinationDroppableId);
    }

    console.log(sourceDroppableId);
    // AQUI EM CIMA É O NOVO

    // const reorderedItems = Array.from(data);
    // const [removed] = reorderedItems.splice(result.source.index, 1);
    // reorderedItems.splice(result.destination.index, 0, removed);

    // setData(reorderedItems);
    // console.log(result); // Verifique o novo estado
  };

  const handleInserirDados = () => {
    if (word == "" || answer == "") {
      null;
    } else {
      if (nameIdDropModal === "droppable1") {
        inserirDadosUsuario(
          idUser,
          word,
          answer,
          setData,
          data,
          nameIdDropModal
        );
        setModal(!modal);
      }
      if (nameIdDropModal === "droppable2") {
        inserirDadosUsuario(
          idUser,
          word,
          answer,
          setData2,
          data2,
          nameIdDropModal
        );
        setModal(!modal);
      }
      if (nameIdDropModal === "droppable3") {
        inserirDadosUsuario(
          idUser,
          word,
          answer,
          setData3,
          data3,
          nameIdDropModal
        );
        setModal(!modal);
      }
    }
  };

  const handleModal = (nameDrop) => {
    setModal(!modal);
    setNameIdDropModal(nameDrop);
  };

  return (
    <div className="home p-3">
      {modal && (
        <div className="bg-black bg-opacity-60 fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center gap-5 max-w-xs w-full">
            <div className="text-orange-500 text-3xl font-bold">
              <h3>New Word</h3>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <input
                type="text"
                placeholder="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="p-2 w-full rounded-lg shadow-md"
              />
              <input
                type="text"
                placeholder="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="p-2 w-full rounded-lg shadow-md"
              />
              <button
                onClick={handleInserirDados}
                className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl text-white text-lg font-bold cursor-pointer"
              >
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-xl w-full mx-auto bg-gray-100 rounded-xl flex items-center justify-center py-8 relative mb-5">
        <img src={iconHome} alt="icon-home" />
        <button
          onClick={handleLogout}
          className="absolute top-10 right-6 cursor-pointer"
        >
          <img src={iconLogout} alt="icon-logout" />
        </button>
      </div>

      <div className="max-w-screen-xl w-full mx-auto h-[200px] flex justify-between flex-wrap gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {[data, data2, data3].map((dataset, idx) => (
            <Droppable
              droppableId={`droppable${idx + 1}`}
              key={`droppable${idx + 1}`}
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full md:max-w-[378px] h-[calc(100vh-190px)] bg-gray-100 rounded-xl overflow-y-auto"
                >
                  <div className="font-bold text-3xl text-pink-500 pl-6 border-b-4 border-gradient-to-r from-pink-500 to-orange-500 relative">
                    <p className="p-4">{["Starting", "Learning", "Dominating"][idx]}</p>
                    <button
                      onClick={() => handleModal(`droppable${idx + 1}`)}
                      className="absolute top-2.5 right-7"
                    >
                      <img src={iconAdd} alt="icon add" />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col gap-6">
                    {dataset && dataset.length > 0 ? (
                      dataset.map((item, index) => (
                        <div key={item.id}>
                          <CardDrag
                            dragId={item.id}
                            index={index}
                            text={item.word}
                            answer={item.answer}
                            idUser={idUser}
                            itemWord={item.word}
                            data={dataset}
                            hidden={item.hidden}
                            setData={
                              idx === 0
                                ? setData
                                : idx === 1
                                ? setData2
                                : setData3
                            }
                            drop={`droppable${idx + 1}`}
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-xl font-bold flex flex-col-reverse items-center justify-center text-gray-500 gap-5 mt-[50%]">
                        No words found
                        <FaBookOpen className="text-[50px] text-orange-300" />
                      </span>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
