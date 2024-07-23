export default function EditButton({ isEditing, toggleEdit, handleSave }) {
    return (
        <button
            onClick={() => isEditing ? handleSave() : toggleEdit()}
            className="rounded bg-[#FBEAEB] font-bold text-[#2F3C7E] px-5 hover:bg-[#fff]"
        >
            {isEditing ? 'Save' : 'Edit'}
        </button>
    );
}