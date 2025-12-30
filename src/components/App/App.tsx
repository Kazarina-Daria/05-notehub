import css from "./App.module.css";
import {useState} from "react";
import NoteList from "../NoteList/NoteList";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from '@tanstack/react-query'

// const queryClient = new QueryClient()

export default function App (){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = ()=> setIsModalOpen (false);
    return (
        <div className={css.app}>
	<header className={css.toolbar}>
        <NoteList/>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
  </header>
</div>

    )
}