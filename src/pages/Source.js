import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/Header";
import SourceCard from "../components/SourceCard";
import Navbar from "../components/Navbar";
import styles from "./Source.module.css";

export default class Source extends Component {
  state = {
    data: [],
    favIds: {},
    token: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchToken = () => {
    fetch("https://api.airboxr.com/auth/loginWithEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "applicant@airboxr.com",
        password: "ZUSrS5jSZDvEPTyX",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        var token = res.accessToken;
        localStorage.setItem("token", token);
        this.fetchData();
      });
  };

  fetchData = () => {
    const token = localStorage.getItem("token");
    // const token = "wcwec";
    fetch("https://api.airboxr.com/data/dataStores", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          this.fetchToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (Array.isArray(res)) {
          this.setState({ data: res });
        }
      })
      .catch((err) => {
        debugger;
        console.log("erevergveegr", err);
      });
  };

  addToFav = (id, e) => {
    e.stopPropagation();
    const { favIds } = this.state;
    if (favIds[id]) {
      let filterObj = Object.keys(favIds).reduce((acc, item) => {
        if (item != id) {
          return { ...acc, [item]: true };
        } else {
          return acc;
        }
      }, {});
      this.setState({ favIds: filterObj });
    } else {
      this.setState((prevState) => ({
        favIds: { ...prevState.favIds, [id]: true },
      }));
    }
  };

  getSorted = () => {
    const { data, favIds } = this.state;
    return data.sort((a, b) => {
      if (favIds[a.id]) {
        return -1;
      } else return 1;
    });
  };

  clickCard = (item) => {
    localStorage.setItem("cardData", JSON.stringify(item));
    window.location.href = "/table";
  };

  render() {
    const { favIds } = this.state;
    const sortedData = this.getSorted();
    return (
      <div className={styles.sourceContainer}>
        <Navbar />
        <Header text="Source" />
        <p>
          Below is a list of the resources you have connected. Please choose the
          data source you would like to import data from.
        </p>
        {sortedData.length > 0 ? (
          <div className={styles.sourceBox}>
            {sortedData.map((d) => (
              <SourceCard
                data={d}
                key={d.id}
                isFav={favIds[d.id]}
                addToFav={this.addToFav}
                click={this.clickCard}
              />
            ))}
          </div>
        ) : (
          <div className={styles.loaderContainer}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}
