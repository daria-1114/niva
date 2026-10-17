import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { apiFetch } from './api.js';

function CreateNoteForm({ onNoteCreated }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('WORK');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await apiFetch('/notes', {
      method: 'POST',
      body: JSON.stringify({ title, content, category }),
    });

    if (response.ok) {
      setTitle('');
      setContent('');
      setCategory('WORK');
      setIsFormOpen(false);
      onNoteCreated();
    } else {
      const errorText = await response.text();
      alert('Failed to create note: ' + errorText);
    }
  };

  return (
    <div className="create-note">
      <button className="fab" onClick={() => setIsFormOpen(!isFormOpen)}>
        {isFormOpen ? <X size={20} /> : <Plus size={20} />}
      </button>

      {isFormOpen && (
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
            onChange={(e) => setContent(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="WORK">Work</option>
            <option value="PERSONAL">Personal</option>
            <option value="IDEAS">Ideas</option>
            <option value="OTHER">Other</option>
          </select>
          <button type="submit">Add Note</button>
        </form>
      )}
    </div>
  );
}

export default CreateNoteForm;