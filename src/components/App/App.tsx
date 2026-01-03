import css from "./App.module.css";
import {useState} from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";


export default function App (){
   const [onQuery, setOnQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [modalOpen, setModalOpen] = useState(false);

   const closeModal = () => setModalOpen(false);
   const openModal = () => setModalOpen(true);

const { data, isSuccess, isLoading, isError } = useQuery({
   queryKey: ['note', currentPage, onQuery],
   queryFn: () => fetchNotes(onQuery, currentPage),
   placeholderData: keepPreviousData,
});
   const totalPages = data?.totalPages;

   const onFound = useDebouncedCallback(
      (value : string )=> {
         setOnQuery(value);
         setCurrentPage(1);
      },
      250
   ); 
    return (
        <div className={css.app}>
	<header className={css.toolbar}>
    <button className={css.button} onClick={openModal}>Create note +</button>
       <SearchBox value={onQuery} onChange={onFound} />
        	{data && data.totalPages !== undefined && (
        <Pagination
        pageCount={totalPages??0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />)}

      </header>
      {isSuccess && data.notes.length === 0 && (
        <div>
          Create your first note
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
     {isSuccess && (data?.notes?.length ?? 0) > 0 && <NoteList notes={data.notes} />}


{modalOpen && (
  <Modal onClose={closeModal}>
<NoteForm onClose={closeModal}/>
  </Modal>)}
</div>

    );
  }