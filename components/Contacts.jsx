import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Edit, Delete } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import firebase from "../utils/firebase";
import EditContact from "./EditContact";

const useStyles = makeStyles({
	root: {
		width: "100%",
		marginTop: "2em",
	},
	container: {
		maxHeight: 440,
	},
});

export default function Contacts() {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [contacts, setContacts] = React.useState([]);
	const [contactId, setContactId] = React.useState("");
	const [edit, setEdit] = React.useState(false);
	const [fullName, setFullName] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [successMsg, setSuccessMsg] = React.useState("");
	const [errorMsg, setErrorMsg] = React.useState("");

	React.useEffect(() => {
		const addressRef = firebase.database().ref("Address-Book");
		addressRef.on("value", (snapshot) => {
			const addresses = snapshot.val();
			const addrr = [];
			for (let id in addresses) {
				addrr.push({ id, ...addresses[id] });
			}
			setContacts(addrr);
		});
	}, []);

	const clearMessages = () => {
		const timer = setTimeout(() => {
			setErrorMsg("");
			setSuccessMsg("");
		}, 1000 * 3);

		return () => clearTimeout(timer);
	};

	const columns = [
		{ id: "name", label: "Name", minWidth: 170 },
		{
			id: "phoneNumber",
			label: "Phone\u00a0Number",
			minWidth: 170,
			format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "emailAddress",
			label: "Email\u00a0Address",
			minWidth: 170,
		},
	];

	const rows = contacts;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const closeEdit = () => {
		setEdit(false);
	};

	const handleEdit = async () => {
		setLoading(true);
		const data = {
			name: fullName,
			phoneNumber: phone,
			emailAddress: email,
		};

		if (
			fullName.trim().length == 0 ||
			phone.trim().length == 0 ||
			email.trim().length == 0
		) {
			setErrorMsg(
				"name,phone or email cannot be empty. Please fill out all fields."
			);
			clearMessages();
			return;
		}
		try {
			const addressRef = firebase
				.database()
				.ref("Address-Book")
				.child(contactId);
			await addressRef.update(data);
			setLoading(false);
			closeEdit();
		} catch (error) {
			setLoading(false);
			setErrorMsg(error.message);
			clearMessages();
		}
	};

	const deleteContact = async (id) => {
		try {
			const addressRef = firebase.database().ref("Address-Book").child(id);
			await addressRef.remove();
			setSuccessMsg("Contact deleted successfully");
			clearMessages();
		} catch (error) {
			setErrorMsg(error.message);
			clearMessages();
		}
	};

	return (
		<>
			{edit ? (
				<EditContact
					open={edit}
					handleClose={closeEdit}
					setFullName={setFullName}
					setPhone={setPhone}
					setEmail={setEmail}
					fullName={fullName}
					email={email}
					phone={phone}
					update={loading}
					handleSubmit={handleEdit}
				/>
			) : (
				""
			)}
			{errorMsg ? (
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(errorMsg)}
					autoHideDuration={6000}
					message={errorMsg}
				/>
			) : (
				""
			)}
			{successMsg ? (
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(successMsg)}
					autoHideDuration={6000}
					message={successMsg}
				/>
			) : (
				""
			)}
			<Typography
				style={{
					color: "rgba(0,0,0,0.6)",
					fontWeight: 900,
					textAlign: "center",
					marginTop: "2em",
				}}
				variant="h5"
				noWrap>
				Contacts
			</Typography>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === "number"
															? column.format(value)
															: value}
													</TableCell>
												);
											})}
											<TableCell>
												<IconButton
													onClick={() => {
														setContactId(row.id);
														setFullName(row.name);
														setPhone(row.phoneNumber);
														setEmail(row.emailAddress);
														setEdit(true);
													}}>
													<Edit style={{ color: "#32506D" }} />
												</IconButton>
											</TableCell>
											<TableCell>
												<IconButton onClick={() => deleteContact(row.id)}>
													<Delete style={{ color: "red" }} />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
