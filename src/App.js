import React, { useState, useEffect } from "react";
import Settings from "./Settings";
import Results from "./Results";
import FakeDataGenerator from "./FakeDataGenerator";
import { CSVLink } from "react-csv";

const App = () => {
  const [region, setRegion] = useState("USA");
  const [errors, setErrors] = useState(0);
  const [recordsCount, setRecordsCount] = useState(20);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 10000000));
  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    const newFakeData = FakeDataGenerator(region, recordsCount, seed, errors);
    setFakeData(newFakeData);
  }, [region, errors, recordsCount, seed]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
  ];

  const data = fakeData.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    phone: item.phone,
  }));

  return (
    <div style={{ padding: "15px" }}>
      <CSVLink
        style={{
          textDecoration: "none",
          border: "1px solid blue",
          padding: "5px",
        }}
        data={data}
        headers={headers}
        filename={"fakeData.csv"}
      >
        Export to CSV
      </CSVLink>

      <Settings
        region={region}
        setRegion={setRegion}
        errors={errors}
        setErrors={setErrors}
        recordsCount={recordsCount}
        setRecordsCount={setRecordsCount}
        seed={seed}
        setSeed={setSeed}
      />
      <Results
        fakeData={fakeData}
        setRecordsCount={setRecordsCount}
        recordsCount={recordsCount}
      />
    </div>
  );
};

export default App;
