export default function EditButton({ edit, toggleEdit, handleSave }) {
    function save() {
        if (edit)
            handleSave();
    }
    return (
        <button onClick={() => { toggleEdit(); save(); }} className="rounded bg-[#FBEAEB] font-bold text-[#2F3C7E] px-5 hover:bg-[#fff]">{edit == false ? 'Edit' : 'Save'}</button>
    )
}