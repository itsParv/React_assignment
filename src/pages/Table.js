import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import styles from "./Table.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';


const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F86164',
  '&:disabled': {
    backgroundColor: '#ddd'
  },
  '&:focus': {
    backgroundColor: '#F86164'
  },
}));

export default class Table extends Component {
  state = {
    data: {},
    tables: {},
    selected: "",
    selectedObj: {},
    subSelected: [],
  };
  componentDidMount() {
    var data = JSON.parse(localStorage.getItem("cardData"));
    var formattedData = this.formatData(data.tables);
    this.setState({ data, tables: formattedData });
  }
  formatData = (data) => {
    var obj = data.reduce((acc, item) => {
      if (item.title.includes("||")) {
        var title = item.title.split("||")[0];
        if (acc[title]) {
          return { ...acc, [title]: [...acc[title], item] };
        } else {
          return { ...acc, [title]: [item] };
        }
      } else {
        return { ...acc, [item.title]: [item] };
      }
    }, {});
    return obj;
  };
  handleChange = (e) => {
    this.setState({ selected: e.target.value });
  };
  clickNext = () => {
    const { selected, tables, subSelected } = this.state;
    if(subSelected.length > 0) {
      console.log("TODO - Go to SelectColumnsPage");
      return;
    }
    if (tables[selected].length === 1) {
      console.log("TODO - Go to SelectColumnsPage", tables[selected][0]);
    } else {
      this.setState({ subSelected: tables[selected], selected:'' });
    }
  };
  render() {
    const { data, tables, selected, subSelected } = this.state;
    return (
      <div>
        <Navbar />
        <Header text="Table" />
        <p>
          {data?.name} has the following tables ready for import. Please select
          the table you would like to import.
        </p>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter</FormLabel>
          <RadioGroup
            aria-label="Filter"
            name="controlled-radio-buttons-group"
            value={selected}
            onChange={this.handleChange}
          >
            {subSelected.length === 0
              ? Object.keys(tables)?.map((d) => (
                  <FormControlLabel
                    value={d}
                    control={<Radio />}
                    label={d}
                    key={d}
                  />
                ))
              : subSelected?.map((d) => {
                  var title = d.title.split('||')[1]
                  return <FormControlLabel
                    value={title}
                    control={<Radio />}
                    label={title}
                    key={title}
                  />
            })}
          </RadioGroup>
        </FormControl>
        <div className={styles.button}>
          <ColorButton
            style={{ width: "100%" }}
            variant="contained"
            disabled={selected ? false : true}
            onClick={this.clickNext}
          >
            Next
          </ColorButton>
        </div>
      </div>
    );
  }
}
