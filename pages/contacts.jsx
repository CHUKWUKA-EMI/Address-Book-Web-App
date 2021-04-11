import ContactsComponent from "../components/Contacts";
import Layout from "../components/Layout";
import Container from "@material-ui/core/Container";

export default function Contacts() {
	return (
		<Layout>
			<Container maxWidth="lg" disableGutters={true}>
				<ContactsComponent />
			</Container>
		</Layout>
	);
}
