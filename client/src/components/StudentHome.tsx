import { useEffect, useState } from "react";
import {
  deleteEtudiantAsync,
  Etudiant,
  getEtudiantAsync,
  getEtudiants,
  updateEtudiantAsync,
} from "../features/EtudiantSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import AddStudent from "./AddStudent";
import EtudiantDetails from "./EtudiantDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateStudent from "./UpdateStudent";

const StudentHome = () => {
  const openModal = (name: string) => {
    const dialog = document.getElementById(name) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const dispatch = useAppDispatch();
  const etudiants = useAppSelector(getEtudiants);

  useEffect(() => {
    dispatch(getEtudiantAsync);
  }, []);

  const [modal, setModal] = useState<{
    etudiant: Etudiant | null;
    index: number;
  }>({
    etudiant: null,
    index: -1,
  });

  useEffect(() => {
    if (modal.etudiant) {
      openModalSpec("dialog-" + modal.index);
    }
  }, [modal]);

  const handleClick = (etudiant: Etudiant, index: number) => {
    setModal({ etudiant, index });
  };

  const handleUpdate = (etudiant: Etudiant) => {
    dispatch(updateEtudiantAsync(etudiant));
  };
  const handleDelete = (etudiant: Etudiant) => {
    dispatch(deleteEtudiantAsync(etudiant));
  };

  const openModalSpec = (name: string) => {
    const dialog = document.getElementById(name) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center pt-32  mx-auto rounded-s-3xl  bg-white w-full h-screen">
        Liste des étudiants
        <div className="overflow-y-auto w-[90%] ">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Prenom</th>
                <th>Nationalité</th>
                <th>Email</th>
                <th>Promotion</th>
                <th>Université</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etudiant: Etudiant, index: number) => (
                <tr
                  key={index}
                  className="hover:cursor-pointer hover:bg-gray-50 transition-all duration-75"
                  onClick={() => handleClick(etudiant, index)}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{etudiant.nom}</td>
                  <td className="px-4 py-2">{etudiant.prenom}</td>
                  <td className="px-4 py-2">
                    {etudiant.nationalite || "Française"}
                  </td>
                  <td className="px-4 py-2">{etudiant.email}</td>
                  <td className="px-4 py-2">{etudiant.promotion}</td>
                  <td className="px-4 py-2">{etudiant.universite}</td>
                  <th onClick={() => handleUpdate(etudiant)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </th>
                  <th onClick={() => handleDelete(etudiant)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-success mx-auto"
          onClick={() => openModal("addStudent")}
        >
          <i className="fa-solid fa-plus w-[20px]"></i> Ajouter un étudiant
        </button>
        <dialog id="addStudent" className="modal">
          <AddStudent />
        </dialog>
        <dialog id="updateStudent" className="modal">
          <AddStudent />
        </dialog>
      </div>

      {modal.etudiant && (
        <dialog id="addStudent" className="modal">
          <AddStudent />
        </dialog>
      )}

      {modal.etudiant && (
        <dialog id="updateStudent" className="modal">
          <UpdateStudent studentData={modal.etudiant} />
        </dialog>
      )}
    </>
  );
};

export default StudentHome;
