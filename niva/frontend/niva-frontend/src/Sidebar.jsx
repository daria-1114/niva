function Sidebar({selectedCategory, onSelectCategory}){
    const categories = ['WORK', 'PERSONAL', 'IDEAS', 'OTHER'];
    return(
        <div className="sidebar">
            <button className={selectedCategory === null ? 'active' : ''}
            onClick={() => onSelectCategory(null)}>All</button>
            {categories.map((cat) => (
                <button key={cat}
                className={selectedCategory === cat ? 'active' :''}
                onClick={() => onSelectCategory(cat)}>{cat}</button>
            ))}
        </div>
    );
}
export default Sidebar;