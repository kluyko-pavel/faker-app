import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Settings = ({
  region,
  setRegion,
  errors,
  setErrors,
  recordsCount,
  setRecordsCount,
  seed,
  setSeed,
}) => {
  const [inputSeed, setInputSeed] = useState("");

  const handleSliderChange = (e) => {
    setErrors(e.target.value);
  };

  const handleInputSeedChange = (e) => {
    setInputSeed(e.target.value);
  };

  const handleSetSeedClick = () => {
    let newSeed;
    if (inputSeed === "") {
      newSeed = Math.floor(Math.random() * 10000000);
    } else {
      newSeed = parseInt(inputSeed) + recordsCount * 10000000;
    }
    setSeed(newSeed);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleRecordsCountChange = (e) => {
    setRecordsCount(parseInt(e.target.value));
  };

  return (
    <div>
      <div>
        <TextField
          label="Seed"
          margin="normal"
          variant="filled"
          value={inputSeed}
          onChange={handleInputSeedChange}
        />
        <Button
          style={{ margin: "20px 0 0 10px" }}
          variant="contained"
          color="primary"
          onClick={handleSetSeedClick}
        >
          Set Seed
        </Button>
      </div>
      <div>
        <TextField
          label="Records Count"
          type="number"
          margin="normal"
          variant="filled"
          value={recordsCount}
          onChange={handleRecordsCountChange}
        />
      </div>
      <div>
        <p>Select Region:</p>
        <select value={region} onChange={handleRegionChange}>
          <option value="USA">USA</option>
          <option value="Poland">Poland</option>
          <option value="Germany">Germany</option>
        </select>
      </div>
      <div>
        <p>Number of Errors:</p>
        <Slider
          value={errors}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          step={0.25}
          min={0}
          max={10}
        />
        <Input
          value={errors}
          onChange={handleSliderChange}
          inputProps={{
            step: 0.25,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
