import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "reactstrap";
import { useData } from "../utils/useData";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

function Table() {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editValues, setEditValues] = useState({});

  const data = useData((state) => state.data);
  const loading = useData((state) => state.loading);
  const hasErrors = useData((state) => state.hasErrors);
  const fetchAllCitizens = useData((state) => state.fetch);
  // const fetchOneCitizen = useData((state) => state.fetchOne);
  // const addCitizen = useData((state) => state.createCitizen);
  // const editCitizen = useData((state) => state.editCitizen);
  const deleteCitizen = useData((state) => state.deleteCitizen);

  const columns = [
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

  const handleDelete = (id) => {
    deleteCitizen(id);
  };

  useEffect(() => {
    fetchAllCitizens();
  }, [fetchAllCitizens]);

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
      {showForm && <AddForm onClick={setShowForm} id={data.length} />}
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
