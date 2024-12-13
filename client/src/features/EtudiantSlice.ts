import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export interface Etudiant {
    nom: string;
    prenom: string;
    sexe: string;
    email: string;
    telephone: string;
    noEtudiantUbo : string,
    dateNaissance: string; // Format ISO "YYYY-MM-DD"
    lieuNaissance: string;
    nationalite?: string; // Optionnelle, valeur par défaut: "Française"
    universite: string;
    promotion: string; // Peut contenir l'année ou le nom de la promotion
    adresse: string;
}

interface etudiantState {
    Etudiant:  Etudiant,
    Etudiants: Etudiant[];
}

const initialState: etudiantState = {
  Etudiant: {} as Etudiant,
  Etudiants: []
};

export const getEtudiantAsync = createAsyncThunk<Etudiant[], void, { rejectValue: string }>(
    "etudiants/getEtudiantAsync",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Etudiant[]>(`${BASE_URL}/etudiants`);
            console.log(response);
            
            return response.data;
        } catch (error: any) {
            console.error("Error fetching machines:", error);
            return rejectWithValue(error.response?.data || "An error occurred while fetching machines.");
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

export const updateEtudiantAsync = createAsyncThunk<Etudiant, Etudiant, { rejectValue: string }>(
    "etudiants/updateEtudiantAsync",
    async (etudiant, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/etudiants`, etudiant);
            return response.data;
        } catch (error: any) {
            console.error("Error posting student:", error);
            return rejectWithValue(error.response?.data || "An error occurred while posting the student.");
        }
    }
);

export const deleteEtudiantAsync = createAsyncThunk<Etudiant, Etudiant, { rejectValue: string }>(
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
      
  },
});

export const getEtudiants = (state: { etudiant: etudiantState }) => state.etudiant.Etudiants;


export default etudiantSlice.reducer;