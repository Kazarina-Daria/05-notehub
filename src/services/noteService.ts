import axios from 'axios';
import { Note} from "../types/note";

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