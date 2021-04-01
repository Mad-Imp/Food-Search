import {useState} from 'react';
import RecipeDetails from "./RecipeDetails";

const Recipe = ({recipe}) => {
    const {label, image, url, ingredients} = recipe.recipe;

    const [show, setShow] = useState(false);

    return (
        <div className="recipe">
            <h2>{label}</h2>
            <img src={image}  alt={label}/>
            <a href={url}
               target="_blank"
               rel="noopener noreferrer">
                Ссылка на рецепт
            </a>
            <button onClick={() => setShow(!show)}>Ингредиенты</button>
            {show && <RecipeDetails ingredients={ingredients}/>}
        </div>
    )
}

export default Recipe;