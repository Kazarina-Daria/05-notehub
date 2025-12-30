 import css from "./NoteList.module.css";
 import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";

interface NodeListProps{
page :number,
search : string
}

 export default function Notelist ({page, search } : NodeListProps){
      const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    keepPreviousData: true, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching notes</p>;
if(!data || data.notes.length === 0) return <p>No notes found</p>;

    return (
    <ul className={css.list}>
        {data.notes.map((note:Note) => 
        ( <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li> ))}
    </ul>
);
 }