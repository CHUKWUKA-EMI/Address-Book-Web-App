import AddContact from "../components/AddContact";
import Layout from "../components/Layout";
import Container from "@material-ui/core/Container";

export default function Add() {
	return (
		<Layout>
			<Container maxWidth="lg" disableGutters={true}>
				<AddContact />
			</Container>
		</Layout>
	);
}
