import { useEffect, useState, useRef } from "react";
import {
  deletePromotionAsync,
  getPromotionAsync,
  getPromotions,
  Promotion,
} from "../../features/EtudiantSlice";
import { IoMdAdd } from "react-icons/io";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddPromotion from "./AddPromotion";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import UpdatePromotion from "./UpdatePromotion";

const PromotionHome = () => {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector(getPromotions);
  const dispatchPromotion = () => {
    dispatch(getPromotionAsync())
}

  const [modal, setModal] = useState<{
    promotion: Promotion | null;
    index: number;
  }>({ promotion: null, index: -1 });

  const [modalUpdate, setModalUpdate] = useState<{
    promotion: Promotion | null;
    index: number;
  }>({ promotion: null, index: -1 });


  const updateStudentModalRef = useRef<HTMLDialogElement | null>(null);
  const etudiantDetailsModalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dispatch(getPromotionAsync());
  }, [dispatch]);

  useEffect(() => {
    if (
      modal.promotion &&
      modal.index !== -1 &&
      etudiantDetailsModalRef.current
    ) {
      etudiantDetailsModalRef.current.showModal();
    }

    if (
      modalUpdate.promotion &&
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

  const handleClick = (promotion: Promotion, index: number) => {
    setModal({ promotion, index });
  };

  const handleClickUpdate = (promotion: Promotion, index: number) => {
    setModalUpdate({ promotion, index });
  };

  const handleDelete = (promotion: Promotion, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deletePromotionAsync(promotion.anneePro));
    dispatch(getPromotionAsync());
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center pt-32 mx-auto rounded-s-3xl bg-white w-full h-screen">
        <h1>Liste des promotions</h1>
        <div className="flex flex-row items-center justify-between gap-5 w-full px-14">
          <button
            className="flex flex-row items-center justify-center gap-5 px-4 py-2 disabled:cursor-not-allowed w-[17%] text-center rounded-md border border-black bg-white text-neutral-700 text-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            onClick={() => openModal("addPromotion")}
          >
            <IoMdAdd className="text-black" /> Ajouter une Promotion
          </button>
        </div>
        <div className="overflow-y-auto w-[90%]">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Annee</th>
                <th>Désignation</th>
                <th>Nombre etudiants max</th>
                <th>Date Rentrée</th>
                <th>Lieu Rentrée</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion: Promotion, index: number) => (
                <tr
                  key={promotion.anneePro}
                  className="hover:cursor-pointer hover:bg-gray-50 transition-all duration-75"
                >
                  <td className="px-4 py-2">{promotion.anneePro}</td>
                  <td className="px-4 py-2">{promotion.siglePro}</td>
                  <td className="px-4 py-2">{promotion.nbEtuSouhaite}</td>
                  <td className="px-4 py-2">{promotion.dateRentree}</td>
                  <td className="px-4 py-2">{promotion.lieuRentree}</td>
                  <td
                    className="flex gap-3 justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-black text-base cursor-pointer"
                      onClick={() => {
                        handleClick({} as Promotion, index);
                        handleClickUpdate({} as Promotion, index);
                        handleClickUpdate(promotion, index);
                        openModal(`updatePromotion-${promotion.anneePro}`);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-black text-base cursor-pointer"
                      onClick={(e) => handleDelete(promotion, e)}
                    />
                    
                  </td>
                  <dialog
                    id={`updatePromotion-${promotion.anneePro}`}
                    className="modal"
                  >
                    <UpdatePromotion promotionData={promotion} dispatchPromotion={dispatchPromotion} />
                  </dialog>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="addPromotion" className="modal">
        <AddPromotion />
      </dialog>
    </>
  );
};

export default PromotionHome;
