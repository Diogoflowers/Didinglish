
import { Draggable } from "react-beautiful-dnd";
import { alterarHidden, excluirDadosUsuario } from "../serviceFirestore";
import iconView from "../imgs/icon-drag-view.png";
import iconView2 from "../imgs/image-drag-hiddenview.png";
import iconX from "../imgs/icon-x.png";

export const CardDrag = ({
  dragId,
  index,
  text,
  idUser,
  itemWord,
  data,
  setData,
  answer,
  hidden,
  drop,
}) => {
  return (
    <Draggable draggableId={dragId} index={index} key={index}>
      {(provided) => (
        <div
          className="font-poppins w-full min-h-[80px]   bg-white flex items-center justify-around text-[#343434] font-medium shadow-[1px_3px_3px_rgba(131,131,131,0.308)] relative text-[clamp(1rem,1.2vw,1.2rem)]"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <button
            className="border-none cursor-pointer bg-none absolute top-[15px] right-[20px]"
            onClick={() =>
              excluirDadosUsuario(idUser, itemWord, data, setData, index, drop)
            }
          >
            <img src={iconX} alt="" />
          </button>

          <div className="text-center h-full w-[40%] ">
            <h1>{text}</h1>
          </div>

          <button className="w-[30px] h-[30px] flex items-center justify-center bg-none border-none cursor-pointer">
            {hidden ? (
              <img
                onClick={() =>
                  alterarHidden(idUser, dragId, setData, data, drop)
                }
                src={iconView2}
                alt="Icon view hidden"
              />
            ) : (
              <img
                onClick={() =>
                  alterarHidden(idUser, dragId, setData, data, drop)
                }
                src={iconView}
                alt="Icon view visible"
              />
            )}
          </button>

          <div className={`text-center w-[40%] ${hidden ? "" : "blur-[5px]"}`}>
            {answer}
          </div>
        </div>
      )}
    </Draggable>
  );
};
