import axios from 'axios';
import { Note, CreateNote } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  totalPages: number;
}

const ACCESS_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
export const fetchNotes= async (page : number = 1, search : string = "") : Promise<FetchNotesResponse>=> {
    const res = await axios.get<FetchNotesResponse>(BASE_URL + "/notes", {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
            page,
            search
        }
    });
    return res.data;
}

export const createNote = async (playload : CreateNote) :Promise<Note[]> => {
    const res = await axios.post<Note[]>(BASE_URL + "/notes", playload, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    });
    return res.data;
}
export const deleteNote = async (id : Note["id"]): Promise<void> =>{
    await axios.delete<void>(BASE_URL + `/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    });
}