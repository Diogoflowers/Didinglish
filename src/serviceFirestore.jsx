import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgLv9GzLxumgepG-G6GUna_nMMHP8FlDw",
  authDomain: "teste-de-autenticacao-c290e.firebaseapp.com",
  projectId: "teste-de-autenticacao-c290e",
  storageBucket: "teste-de-autenticacao-c290e.appspot.com",
  messagingSenderId: "956991640041",
  appId: "1:956991640041:web:e412234143aadd6f84bb78",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inicializa o Firestore
const db = getFirestore(app);

// Função para registrar usuário
export const registrarUsuario = (email, password, navigate) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const userID = res.user.uid;
      const refDoc = doc(db, "users", userID);
      return setDoc(refDoc, { email: email }); // Retorna a Promise
    })
    .then(() => {
      navigate("/"); // Navega após o registro
    })
    .catch((error) => {
      console.error("Erro ao registrar usuário:", error);
      // Você pode adicionar feedback ao usuário aqui
    });
};

// Função para logar usuário
export const logarUsuario = (
  email,
  password,
  navigate,
  setToken,
  setIdUser
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const userId = res.user.uid;

      localStorage.setItem("token", userId);
      setIdUser(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
      navigate("/home");
    })
    .catch((error) => {
      console.error("Erro ao logar usuário:", error);
    });
};

export const pegarDadosUsuario = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef); // Usa getDoc para buscar um único documento

  if (docSnap.exists()) {
    return docSnap.data(); // Retorna os dados do documento
  } else {
    console.log("Documento não encontrado!");
    return null;
  }
};

export const inserirDadosUsuario = async (
  userId,
  word,
  answer,
  setData,
  data,
  nameDrop
) => {
  const uniqueId = uuidv4(); // Gerar um novo ID único dentro da função
  const docRef = doc(db, "users", userId); // Referência ao documento no Firestore

  await updateDoc(docRef, {
    [nameDrop]: arrayUnion({
      id: uniqueId,
      word: word,
      answer: answer,
      hidden: false,
    }),
  });

  const newData = Array.isArray(data) ? data : [];
  setData([
    ...newData,
    { id: uniqueId, word: word, answer: answer, hidden: false },
  ]);
};

export const excluirDadosUsuario = async (
  userId,
  wordToRemove,
  data,
  setData,
  index,
  drop
) => {
  const docRef = doc(db, "users", userId); // Referência ao documento do usuário
  const docSnap = await getDoc(docRef);
  const newArray = [...data];

  if (docSnap.exists()) {
    const data = docSnap.data();
    const updatedCards = data[drop].filter(
      (card) => card.word !== wordToRemove
    );

    await updateDoc(docRef, {
      [drop]: updatedCards,
    });
    newArray.splice(index, 1);
    setData(newArray);

    console.log("Card excluído com sucesso!");
  } else {
    console.log("Documento não encontrado!");
  }
};

export const atualizarOrdem = async (idUser, reorderedItems, nameDrop) => {
  const docRef = doc(db, "users", idUser);
  await updateDoc(docRef, {
    [nameDrop]: reorderedItems,
  });
};

export const alterarHidden = async (userId, cardId, setData, data, drop) => {
  try {
    const docRef = doc(db, "users", userId); // Referência ao documento no Firestore

    // Encontra o card com o id especificado no estado local
    const card = data.find((item) => item.id === cardId);
    if (!card) return; // Se o card não for encontrado, encerra a função

    // Atualiza o valor de hidden para o oposto do valor atual
    const updatedCard = { ...card, hidden: !card.hidden };

    // Remove o card antigo e adiciona o atualizado no Firestore
    await updateDoc(docRef, {
      [drop]: arrayRemove(card),
    });
    await updateDoc(docRef, {
      [drop]: arrayUnion(updatedCard),
    });

    // Atualiza o estado local com o card atualizado
    setData(data.map((item) => (item.id === cardId ? updatedCard : item)));
  } catch (error) {
    console.error("Erro ao alterar o valor de hidden:", error);
  }
};
