import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Menu, Search } from "@material-ui/icons";
import {
  Container,
  Backdrop,
  Paper,
  InputBase,
  IconButton,
  Divider,
  CssBaseline,
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "cd00d6a1ca5b5f303f26a4099eceb92f";

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1
  },
  root: {
    padding: "0px 4px",
    marginTop: "0px",
    display: "flex",
    alignItems: "center",
    width: 550
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));
export default function App() {
  const [isError, setError] = useState(false);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const classes = useStyles();
  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.get(URL, {
        params: {
          q: city,
          units: "metric",
          APPID: API_KEY
        }
      });
      setWeather(data);
      setCity("");
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };
  const search = async e => {
    try {
      if (e.key === "Enter") {
        setLoading(true);
        setError(false);
        const { data } = await axios.get(URL, {
          params: {
            q: city,
            units: "metric",
            APPID: API_KEY
          }
        });
        setWeather(data);
        setCity("");
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };
  const handleInput = e => {
    setCity(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };
  return (
    <div className="appback">
      <CssBaseline />
      <Backdrop
        className={classes.backdrop}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isError && (
        <Snackbar open={isError} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Searched City Not Found!
          </Alert>
        </Snackbar>
      )}
      <Container maxWidth="sm" className={classes.container}>
        <Paper className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <Menu />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search City"
            value={city}
            onKeyPress={search}
            onChange={handleInput}
            inputProps={{ "aria-label": "search wheather" }}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <IconButton
              type="button"
              onClick={getData}
              className={classes.iconButton}
              aria-label="search"
            >
              <Search />
            </IconButton>
          )}
        </Paper>

        {weather.main && (
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${
                  weather.weather[0].icon
                }@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
