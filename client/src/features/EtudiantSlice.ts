import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8092/api";

export interface Etudiant {
    nom: string;
    prenom: string;
    sexe: string;
    email: string;
    telephone: string;
    noEtudiantUbo: string,
    noEtudiantNat: number,
    dateNaissance: string;
    lieuNaissance: string;
    nationalite?: string;
    universite: string;
    anneePro: number;
    adresse: string;
}

export interface Promotion {
    id: number;
    anneePro: string;
    siglePro: string;
    nbEtudiant: number;
    dateRentree: string;
    lieuRentree: string;
}

interface etudiantState {
    Promotions: Promotion[];
    Etudiant: Etudiant,
    Etudiants: Etudiant[];
}

const initialState: etudiantState = {
    Etudiant: {} as Etudiant,
    Etudiants: [],
    Promotions: [],
};

export const getPromotionAsync = createAsyncThunk<Promotion[], void, { rejectValue: string }>(
    "promotions/getPromotionAsync",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Promotion[]>(`${BASE_URL}/promotions`);
            console.log(response);

            return response.data;
        } catch (error: any) {
            console.error("Error fetching machines:", error);
            return rejectWithValue(error.response?.data || "An error occurred while fetching machines.");
        }
    }
);

export const getEtudiantAsync = createAsyncThunk<Etudiant[], void, { rejectValue: string }>(
    "etudiants/getEtudiantAsync",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Etudiant[]>(`${BASE_URL}/etudiants`);
            console.log("hhhhhhh");

            return response.data;
        } catch (error: any) {
            console.error("Error fetching students:", error);
            return rejectWithValue(error.response?.data || "An error occurred while fetching students.");
        }
    }
);

export const postEtudiantAsync = createAsyncThunk<Etudiant, Etudiant, { rejectValue: string }>(
    "etudiants/postEtudiantAsync",
    async (etudiant, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/etudiants`, etudiant);
            return response.data;
        } catch (error: any) {
            console.error("Error posting student:", error);
            return rejectWithValue(error.response?.data || "An error occurred while posting the student.");
        }
    }
);

export const updateEtudiantAsync = createAsyncThunk<void, Etudiant, { rejectValue: string }>(
    "etudiants/updateEtudiantAsync",
    async (etudiant, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/etudiants/${etudiant.noEtudiantNat}`, etudiant);
            return response.data;
        } catch (error: any) {
            console.error("Error posting student:", error);
            return rejectWithValue(error.response?.data || "An error occurred while posting the student.");
        }
    }
);

export const deleteEtudiantAsync = createAsyncThunk<Etudiant, Number, { rejectValue: string }>(
    "etudiants/deleteEtudiantAsync",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/etudiants/${id}`);
            return response.data;
        } catch (error: any) {
            console.error("Error posting student:", error);
            return rejectWithValue(error.response?.data || "An error occurred while posting the student.");
        }
    }
);

const etudiantSlice = createSlice({
    name: "etudiant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEtudiantAsync.fulfilled, (state, action) => {
                state.Etudiants = action.payload;
            })
            .addCase(getPromotionAsync.fulfilled, (state, action) => {
                state.Promotions = action.payload;
            })
    },
});

export const getEtudiants = (state: { etudiant: etudiantState }) => state.etudiant.Etudiants;

export const getPromotions = (state: { etudiant: etudiantState }) => state.etudiant.Promotions;


export default etudiantSlice.reducer;