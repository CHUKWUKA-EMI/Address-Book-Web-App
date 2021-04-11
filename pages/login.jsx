import LoginComponent from "../components/Login";
import Layout from "../components/Layout";
import Container from "@material-ui/core/Container";

export default function Login() {
	return (
		<Layout>
			<Container maxWidth="md" disableGutters={true}>
				<LoginComponent />
			</Container>
		</Layout>
	);
}
