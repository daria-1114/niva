import { useState,useEffect } from "react";
import { apiFetch } from "./api";

function NotesList({refreshKey, selectedCategory}){
    const[notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editCategory, setEditCategory] = useState('WORK');

         async function fetchNotes() {
        const path = selectedCategory
            ? `/notes/category/${selectedCategory}`
            : '/notes';
        const response = await apiFetch(path);
        if (response.ok) {
            const data = await response.json();
            const sorted = [...data].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setNotes(sorted);
        }
    }

       
        useEffect(() =>{
            fetchNotes();
        },[refreshKey, selectedCategory]);

    async function handleDelete(id){
        const response = await apiFetch(`/notes/${id}`,{
            method:'DELETE',
        });
        if(response.ok){
            fetchNotes();
        }else{
            alert('Failed to delete note');
        }
    }
    function startEditing(note) {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditCategory(note.category);
    }
    async function handleUpdate(id) {
        const response = await apiFetch(`/notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: editTitle,
                content: editContent,
                category: editCategory,
            }),
        });
        if (response.ok) {
            setEditingId(null);
            fetchNotes();
        } else {
            alert('Failed to update note');
        }
    }
    return (
        <div className="notes-main">
            <h2>{selectedCategory ? selectedCategory : 'All Notes'}</h2>
            {notes.length === 0 && <p>No notes yet.</p>}
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {editingId === note.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                                <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                                    <option value="WORK">Work</option>
                                    <option value="PERSONAL">Personal</option>
                                    <option value="IDEAS">Ideas</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                <button onClick={() => handleUpdate(note.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <strong>{note.title}</strong> ({note.category})
                                <p>{note.content}</p>
                                <button onClick={() => startEditing(note)}>Edit</button>
                                <button onClick={() => handleDelete(note.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default NotesList;