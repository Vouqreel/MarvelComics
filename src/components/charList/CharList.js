import { useState, useEffect, useRef } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import "./charList.scss";

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(1420);
	const [charEnded, setCharEnded] = useState(false);
	const [activeChar, setActiveChar] = useState(null);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newCharList) => {
		let ended = false;

		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};
	function renderItems(arr) {
		const items = arr.map((item) => {
			let imgStyle = {
				objectFit: "cover",
			};
			if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
				imgStyle = {
					objectFit: "unset",
				};
			}

			return (
				<li
					className={`char__item ${activeChar === item.id ? "char__item_selected" : ""}`}
					key={item.id}
					tabIndex={0}
					onClick={() => {
						props.onCharSelected(item.id);
						setActiveChar((activeChar) => item.id);
					}}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		// А эта конструкция вынесена для центровки спиннера/ошибки
		return <ul className="char__grid">{items}</ul>;
	}

	const items = renderItems(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				style={{ display: charEnded ? "none" : "block" }}
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default CharList;
