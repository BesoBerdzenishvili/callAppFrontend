import { useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "reactstrap";
import { useData } from "../utils/useData";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

function Table({ dataForTable }) {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editValues, setEditValues] = useState({});

  const data = dataForTable;
  const loading = useData((state) => state.loading);
  const hasErrors = useData((state) => state.hasErrors);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
    },
    {
      name: "Street",
      selector: (row) => row.address.street,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      selector: (row) => {
        return (
          <Button color="danger" onClick={() => handleDelete(row._id)}>
            X
          </Button>
        );
      },
    },
  ];

  const handleRowDoubleClicked = (editObj) => {
    setEditValues(editObj);
    setShowEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/citizens/${id}`, {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        console.log(json.message);
      }
    } catch (e) {
      console.log(e?.message ?? "Something went wrong");
    }
    window.location.reload(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (hasErrors) {
    return <p>cannot read data</p>;
  }

  return (
    <div>
      <Button color="success" onClick={() => setShowForm(true)}>
        ADD
      </Button>
      {showForm && (
        <AddForm onClick={setShowForm} citizensLength={data.length} />
      )}
      {showEdit && <EditForm onClick={setShowEdit} editValues={editValues} />}
      <DataTable
        columns={columns}
        data={data}
        onRowDoubleClicked={(row) =>
          handleRowDoubleClicked({
            _id: row._id,
            id: row.id,
            name: row.name,
            email: row.email,
            gender: row.gender,
            address: row.address,
            phone: row.phone,
          })
        }
      />
    </div>
  );
}

export default Table;
