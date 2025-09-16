import { useState } from "react";
import FormMaker from "./components/FormMaker";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { formStructure } from "./components/FormStructures";

function App() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [lastId, setLastId] = useState(0);
  const [showCreate, setShowCreate] = useState(false);

  const handleUpdate = (id: number | string, obj: Record<string, any>) => {
    console.log("trying to update: ", { id, obj })
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, ...obj } : item
      )
    );
  };

  const handleDelete = (id: number | string) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return <>
    <h2 className="text-2xl font-bold text-center my-4">Data</h2>
    {
      data.length === 0 && (
        <p className="text-center my-4">No data has been created</p>
      )
    }
    <button
      onClick={() => setShowCreate(true)}
      className="border p-2 rounded-xl bg-green-900 hover:bg-green-600 text-white cursor-pointer mx-auto block"
    >
      Add new
    </button>
    {
      data.length > 0 && (
        <Table
          data={data}
          onUpdate={(id: number | string, obj: Record<string, any>) => handleUpdate(id, obj)}
          onDelete={(id: number | string) => handleDelete(id)}
          formStructure={formStructure}
          tableClassName="mx-auto my-5"
          tdClassName="border-b p-2 border-r last:border-r-0"
        />
      )
    }
    <Modal title="Create" isOpen={showCreate} onClose={() => setShowCreate(false)}>
      <FormMaker
        {...formStructure}
        buttonText="Create"
        onSubmit={(obj: Record<string, string | number>) => {
          const newId = lastId + 1;
          setData([...data, { ...obj, id: newId }]);
          setLastId(newId);
          setShowCreate(false);
        }}
      />
    </Modal>
  </>
}

export default App