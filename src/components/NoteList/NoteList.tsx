 import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";

interface NodeListProps{
   notes: Note[];
}

 export default function Notelist ({notes} : NodeListProps){

  const {mutate } =useMutation({
      const queryClient = useQueryClient();
    mutationFn: deleteNote,
    onSuccess:() => {
       queryClient.invalidateQueries({ queryKey: ["notes"] }); 
 },})

    return (
    <ul className={css.list}>
        {notes.map((note:Note) => 
        ( <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => mutate(note.id)}>Delete</button>
          </div>
        </li> ))}
    </ul>
);
 }