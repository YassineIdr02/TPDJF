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
    siglePro: string;
}

export interface Promotion {
    anneePro: number;
    siglePro: string;
    nbEtuSouhaite: number;
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
            return response.data;
        } catch (error: any) {
            console.error("Error fetching students:", error);
            return rejectWithValue(error.response?.data || "An error occurred while fetching students.");
        }
    }
);

export const postPromotionsAsync = createAsyncThunk<Promotion, Promotion, { rejectValue: string }>(
    "promotions/postEtudiantAsync",
    async (promotion, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/promotions`, promotion);
            console.log(response);
            
            return response.data;
        } catch (error: any) {
            console.error("Error posting promotion:", error);
            return rejectWithValue(error.response?.data || "An error occurred while posting the promotion.");
        }
    }
);

export const updatePromotionAsync = createAsyncThunk<Promotion, Promotion, { rejectValue: string }>(
    "promotions/updateEtudiantAsync",
    async (promotion, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/promotions/${promotion.anneePro}`, promotion);
            return response.data;
        } catch (error: any) {
            console.error("Error updating promotion:", error);
            return rejectWithValue(error.response?.data || "An error occurred while updating the promotion.");
        }
    }
);

export const deletePromotionAsync = createAsyncThunk<Promotion, Number, { rejectValue: string }>(
    "promotions/deleteEtudiantAsync",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/promotions/${id}`);
            return response.data;
        } catch (error: any) {
            console.error("Error deleting student:", error);
            return rejectWithValue(error.response?.data || "An error occurred while deleting the student.");
        }
    }
);


export const getEtudiantAsync = createAsyncThunk<Etudiant[], void, { rejectValue: string }>(
    "etudiants/getEtudiantAsync",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Etudiant[]>(`${BASE_URL}/etudiants`);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching students:", error);
            return rejectWithValue(error.response?.data || "An error occurred while fetching students.");
        }
    }
);

export const getEtudiantByPromotionAsync = createAsyncThunk<Etudiant[], Number, { rejectValue: string }>(
    "students/getEtudiantByPromotionAsync",
    async (anneePro, { rejectWithValue }) => {
        try {
            const response = await axios.get<Etudiant[]>(`${BASE_URL}/promotions/students/${anneePro}`);            
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
            console.log(response);
            
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
            .addCase(getEtudiantByPromotionAsync.fulfilled, (state, action) => {
                state.Etudiants = action.payload;
            })
    },
});

export const getEtudiants = (state: { etudiant: etudiantState }) => state.etudiant.Etudiants;


export const getPromotions = (state: { etudiant: etudiantState }) => state.etudiant.Promotions;


export default etudiantSlice.reducer;