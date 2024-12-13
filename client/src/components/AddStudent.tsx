import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { getEtudiantAsync, postEtudiantAsync } from "../features/EtudiantSlice";

const AddStudent = () => {
    const dispatch = useAppDispatch()
    const [student, setStudent] = useState({
        nom: "",
        prenom: "",
        sexe: "",
        email: "",
        telephone: "",
        noEtudiantUbo: "",
        dateNaissance: "",
        lieuNaissance: "",
        nationalite: "Française", 
        universite: "",
        promotion: "2024",
        adresse: "",
        noEtudiantNat: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = () => {
       
        dispatch(postEtudiantAsync(student))
        dispatch(getEtudiantAsync());

    };

    return (
        <div className="flex justify-center items-center w-full h-screen backdrop-blur-sm">
            <div className="modal-box w-[50em] max-w-5xl">
                <h3 className="font-bold text-lg my-4">Ajouter un étudiant</h3>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row justify-between">
                        <label className="input input-bordered flex items-center gap-2">
                            <span className="font-semibold">Nom</span>
                            <input
                                type="text"
                                name="nom"
                                value={student.nom}
                                onChange={handleChange}
                                className="grow"
                                placeholder="Ex: John"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <span className="font-semibold">Prénom</span>
                            <input
                                type="text"
                                name="prenom"
                                value={student.prenom}
                                onChange={handleChange}
                                className="grow"
                                placeholder="Ex: Doe"
                            />
                        </label>
                    </div>

                    <label className="flex items-center gap-2">
                        <select
                            name="sexe"
                            value={student.sexe}
                            onChange={handleChange}
                            className="select select-bordered w-full max-w-full"
                        >
                            <option disabled value="">
                                Sélectionnez un sexe
                            </option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">No UBO</span>
                        <input
                            type="text"
                            name="noEtudiantUbo"
                            value={student.noEtudiantUbo}
                            onChange={handleChange}
                            className="grow"
                            placeholder="Numéro étudiant UBO"
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            className="grow"
                            placeholder="john.doe@univ-brest.fr"
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Téléphone</span>
                        <input
                            type="text"
                            name="telephone"
                            value={student.telephone}
                            onChange={handleChange}
                            className="grow"
                            placeholder="Ex: 0700000000"
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Date de naissance</span>
                        <input
                            type="date"
                            name="dateNaissance"
                            value={student.dateNaissance}
                            onChange={handleChange}
                            className="grow"
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Lieu de naissance</span>
                        <input
                            type="text"
                            name="lieuNaissance"
                            value={student.lieuNaissance}
                            onChange={handleChange}
                            className="grow"
                            placeholder="Ex: Paris"
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Nationalité</span>
                        <input
                            type="text"
                            name="nationalite"
                            value={student.nationalite}
                            onChange={handleChange}
                            className="grow"
                            placeholder="La valeur par défaut est Française"
                        />
                        <span className="badge badge-ghost">Optionnel</span>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Université</span>
                        <input
                            type="text"
                            name="universite"
                            value={student.universite}
                            onChange={handleChange}
                            className="grow"
                            placeholder="Ex: Université de Bretagne Occidentale"
                        />
                    </label>

                   
                    <label className="input input-bordered flex items-center gap-2">
                        <span className="font-semibold">Adresse</span>
                        <input
                            type="text"
                            name="adresse"
                            value={student.adresse}
                            onChange={handleChange}
                            className="grow"
                            placeholder="Ex: 2 Rue Matthieu Gallou"
                        />
                    </label>
                </div>

                <div className="modal-action">
                    <form method="dialog" className="flex flex-row gap-5">
                        <button className="btn" >
                            Annuler
                        </button>
                        <button className="btn btn-neutral" onClick={handleSubmit}>
                            Ajouter
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddStudent;
