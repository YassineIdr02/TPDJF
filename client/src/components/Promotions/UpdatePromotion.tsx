import React, { useState } from "react";
import { Promotion, updatePromotionAsync } from "../../features/EtudiantSlice";
import { useAppDispatch } from "../../hooks/hooks";

interface UpdatePromotioProps {
  promotionData: Promotion;
  dispatchPromotion : () => void;
}

const UpdatePromotion = ({ promotionData,dispatchPromotion }: UpdatePromotioProps) => {
  const dispatch = useAppDispatch();
  const [promotion, setPromotion] = useState<Promotion>({
    ...promotionData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromotion({
      ...promotion,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promotion.anneePro &&
      promotion.siglePro &&
      promotion.nbEtuSouhaite &&
      promotion.dateRentree &&
      promotion.lieuRentree
    ){
      dispatch(updatePromotionAsync(promotion)).then(() => {
       dispatchPromotion()
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen backdrop-blur-sm">
    <div className="modal-box w-[50em] max-w-5xl">
      <h3 className="font-bold text-lg my-4">Modifier un étudiant</h3>
      <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
              <label className="input input-bordered flex items-center gap-2">
                <span className="font-semibold">Désignation</span>
                <input
                  required
                  type="text"
                  name="siglePro"
                  value={promotion.siglePro}
                  onChange={handleChange}
                  className="grow"
                  placeholder="Ex: DOSI"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <span className="font-semibold">Nbr Etudiants</span>
                <input
                  required
                  type="number"
                  name="nbEtuSouhaite"
                  value={promotion.nbEtuSouhaite}
                  onChange={handleChange}
                  className="grow"
                  placeholder="Ex: 25"
                />
              </label>
            </div>

            <label className="input input-bordered flex items-center gap-2">
              <span className="font-semibold">Date rentrée</span>
              <input
                required
                type="date"
                name="dateRentree"
                value={promotion.dateRentree}
                onChange={handleChange}
                className="grow"
                placeholder="Ex: 2022-09-01"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <span className="font-semibold">Lieu rentrée</span>
              <input
                required
                type="text"
                name="lieuRentree"
                value={promotion.lieuRentree}
                onChange={handleChange}
                className="grow"
                placeholder="Brest"
              />
            </label>

          </div>
        </form>
        <div className="modal-action">
          <form method="dialog" className="flex flex-row gap-5">
            <button className="btn">Annuler</button>
            <button className="btn btn-neutral" onClick={handleSubmit}>
              Mis à jour
            </button>
          </form>
        </div>
    </div>
  </div>
  );
};

export default UpdatePromotion;
