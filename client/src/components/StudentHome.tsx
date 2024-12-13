import { useEffect, useState } from "react";
import {
  deleteEtudiantAsync,
  Etudiant,
  getEtudiantAsync,
  getEtudiants,
  getPromotionAsync,
  getPromotions,
  updateEtudiantAsync,
} from "../features/EtudiantSlice";
import { IoMdAdd } from "react-icons/io";
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
  const promotions = useAppSelector(getPromotions);

  useEffect(() => {
    dispatch(getEtudiantAsync());
    dispatch(getPromotionAsync());
  }, [dispatch]);

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
    dispatch(deleteEtudiantAsync(etudiant.noEtudiantNat));
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
        <div className="flex flex-row items-center justify-between gap-5 w-full px-4">
          <select defaultValue="default">
            <option value="default" disabled>
              Selectionnez une promotion
            </option>
            {promotions.map((promotion, index) => (
              <option key={index} value={promotion.anneePro}>
                {promotion.anneePro} : {promotion.sigle}
              </option>
            ))}
          </select>
          <button
            className="flex flex-row items-center justify-center gap-5 px-4 py-2 disabled:cursor-not-allowed w-[17%] text-center rounded-md border border-black bg-white text-neutral-700 text-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 "
            onClick={() => openModal("addStudent")}
          >
            <IoMdAdd className="text-black" /> Ajouter un étudiant
          </button>
        </div>
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
                  <th
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleUpdate(etudiant);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-black text-base"
                    />
                  </th>
                  <th
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleDelete(etudiant);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-black text-base"
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="addStudent" className="modal">
        <AddStudent />
      </dialog>

      {modal.etudiant && (
        <dialog id="updateStudent" className="modal">
          <UpdateStudent studentData={modal.etudiant} />
        </dialog>
      )}

      {modal.etudiant && (
        <dialog id={`dialog-${modal.index}`} className="modal">
          <EtudiantDetails etudiant={modal.etudiant} />
        </dialog>
      )}
    </>
  );
};

export default StudentHome;
