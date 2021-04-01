import React, {useState} from "react";
import Axios from 'axios';
import {v4 as uuidv4} from "uuid";
import './App.css';
import Recipe from './components/Recipe';
import Alert from "./components/Alert";

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = '92b49205';
  const APP_KEY = 'c3692b17f6a9f0d3ea504ed22e3b07db';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("Такого блюда не найдено")
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Введите название блюда");
    }
  }

  const onChange = e => {
  setQuery(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <h1>Поиск рецептов</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert}/>}
        <input className="search-form__text"
               type="text"
               placeholder="Например: pizza"
               autoComplete="off"
               onChange={onChange}
               value={query}/>
        <input className="search-form__submit"
               type="submit"
               value="Поиск"/>
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
}

export default App;
