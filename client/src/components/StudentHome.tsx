import { useEffect, useState, useRef } from "react";
import {
  deleteEtudiantAsync,
  Etudiant,
  getEtudiantAsync,
  getPromotionAsync,
  getPromotions,
  getEtudiants,
} from "../features/EtudiantSlice";
import { IoMdAdd } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import AddStudent from "./AddStudent";
import EtudiantDetails from "./EtudiantDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UpdateStudent from "./UpdateStudent";

const StudentHome = () => {
  const dispatch = useAppDispatch();
  const etudiants = useAppSelector(getEtudiants);
  const promotions = useAppSelector(getPromotions);

  const [modal, setModal] = useState<{
    etudiant: Etudiant | null;
    index: number;
  }>({ etudiant: null, index: -1 });

  const [modalUpdate, setModalUpdate] = useState<{
    etudiant: Etudiant | null;
    index: number;
  }>({ etudiant: null, index: -1 });

  const addStudentModalRef = useRef<HTMLDialogElement | null>(null);
  const updateStudentModalRef = useRef<HTMLDialogElement | null>(null);
  const etudiantDetailsModalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dispatch(getEtudiantAsync());
    dispatch(getPromotionAsync());
  }, [dispatch]);

  useEffect(() => {
    if (
      modal.etudiant &&
      modal.index !== -1 &&
      etudiantDetailsModalRef.current
    ) {
      etudiantDetailsModalRef.current.showModal();
    }

    if (
      modalUpdate.etudiant &&
      modalUpdate.index !== -1 &&
      updateStudentModalRef.current
    ) {
      updateStudentModalRef.current.showModal();
    }
  }, [modal, modalUpdate]);

  const openModal = (name: string) => {
    const dialog = document.getElementById(name) as HTMLDialogElement;
    if (dialog) dialog.showModal();
  };

  const handleClick = (etudiant: Etudiant, index: number) => {
    setModal({ etudiant, index });
  };

  const handleClickUpdate = (etudiant: Etudiant, index: number) => {
    setModalUpdate({ etudiant, index });
  };

  const handleDelete = (etudiant: Etudiant, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteEtudiantAsync(etudiant.noEtudiantNat));
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center pt-32 mx-auto rounded-s-3xl bg-white w-full h-screen">
        <h1>Liste des étudiants</h1>
        <div className="flex flex-row items-center justify-between gap-5 w-full px-14">
          <select defaultValue="default" className="select">
            <option value="default" disabled>
              Sélectionnez une promotion
            </option>
            {promotions.map((promotion) => (
              <option key={promotion.anneePro} value={promotion.anneePro}>
                {promotion.anneePro} : {promotion.sigle}
              </option>
            ))}
          </select>
          <button
            className="flex flex-row items-center justify-center gap-5 px-4 py-2 disabled:cursor-not-allowed w-[17%] text-center rounded-md border border-black bg-white text-neutral-700 text-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            onClick={() => openModal("addStudent")}
          >
            <IoMdAdd className="text-black" /> Ajouter un étudiant
          </button>
        </div>
        <div className="overflow-y-auto w-[90%]">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Nationalité</th>
                <th>Email</th>
                <th>Promotion</th>
                <th>Université</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etudiant: Etudiant, index: number) => (
                <tr
                  key={etudiant.noEtudiantNat}
                  className="hover:cursor-pointer hover:bg-gray-50 transition-all duration-75"
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
                  <td
                    className="flex gap-3 justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-black text-base cursor-pointer"
                      onClick={() => {
                        handleClick({} as Etudiant, index);
                        handleClickUpdate({} as Etudiant, index);
                        handleClickUpdate(etudiant, index);
                        openModal(`updateStudent-${etudiant.noEtudiantNat}`);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-black text-base cursor-pointer"
                      onClick={(e) => handleDelete(etudiant, e)}
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-black text-base cursor-pointer"
                      onClick={() => {
                        handleClick({} as Etudiant, index);
                        handleClickUpdate({} as Etudiant, index);
                        handleClick(etudiant, index);
                        openModal(`inspect-${etudiant.noEtudiantNat}`);
                        
                        
                      }}
                    />
                  </td>
                  <dialog
                    id={`updateStudent-${etudiant.noEtudiantNat}`}
                    className="modal"
                  >
                    <UpdateStudent studentData={etudiant} />
                  </dialog>
                  <dialog id={`inspect-${etudiant.noEtudiantNat}`} className="modal">
                    <EtudiantDetails etudiant={etudiant} />
                  </dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog ref={addStudentModalRef} className="modal">
        <AddStudent />
      </dialog>
    </>
  );
};

export default StudentHome;
