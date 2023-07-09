import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
	return (
		<div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px" }}>
			<ErrorMessage></ErrorMessage>
			<h1>Page doesn't exist</h1>
			<Link style={{ color: "#9f0013", fontWeight: "bold", fontSize: "20px" }} to="/">
				Back to main page
			</Link>
		</div>
	);
};

export default Page404;
