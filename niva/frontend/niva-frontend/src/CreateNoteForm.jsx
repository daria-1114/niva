import { useState } from "react";
import { apiFetch } from "./api";

function CreateNoteForm({onNoteCreated}){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('WORK');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await apiFetch('/notes', {
            method:'POST',
            body: JSON.stringify({title, content, category}),
        });
        if(response.ok){
            setTitle('');
            setContent('');
            setCategory('WORK');
            onNoteCreated();
        } else {
            const errorText = await response.text();
            alert('Failed to create note: '+errorText);
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
            placeholder="Content"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="WORK">Work</option>
            <option value="PERSONAL">Personal</option>
            <option value="IDEAS">Ideas</option>
            <option value="OTHER">Other</option>
            </select>
            <button type="submit">Add Note</button>
        </form>
    );
}
export default CreateNoteForm;