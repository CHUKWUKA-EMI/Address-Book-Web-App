import SignUpComponent from "../components/SignUp";
import Layout from "../components/Layout";
import Container from "@material-ui/core/Container";

export default function SignUp() {
	return (
		<Layout>
			<Container maxWidth="md" disableGutters={true}>
				<SignUpComponent />
			</Container>
		</Layout>
	);
}
