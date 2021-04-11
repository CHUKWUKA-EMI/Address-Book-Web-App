import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Box, Hidden, Input, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "7em",
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		fontSize: "bold",
		marginTop: "1em",
	},
	profileInfo: {
		border: "1px solid #32506D",
		padding: "0.3em 1em",
		borderRadius: "5px",
	},
}));

export default function AddContact() {
	const classes = useStyles();
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);
	const [fullName, setFullName] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [successMsg, setSuccessMsg] = React.useState("");
	const [errorMsg, setErrorMsg] = React.useState("");
	const [userId, setUserId] = React.useState(null);

	React.useEffect(() => {
		const id = localStorage.getItem("userId");
		if (id == null || id == "" || id == undefined) {
			router.push("/login");
		}

		setUserId(id);
	}, []);

	//function for clearing error and success messages
	const clearMessages = () => {
		const timer = setTimeout(() => {
			setErrorMsg("");
			setSuccessMsg("");
		}, 1000 * 3);

		return () => clearTimeout(timer);
	};

	const handleSubmit = async () => {
		setLoading(true);
		const data = {
			name: fullName,
			phoneNumber: phone,
			emailAddress: email,
			userId: userId,
		};
		//validate inputs
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
			//Add contact details to the database
			const addressRef = firebase.database().ref("Address-Book");
			const add = await addressRef.push(data);
			if (add) {
				setLoading(false);
				setSuccessMsg(
					"You have successfully added a contact to your Address Book"
				);
				//redirect to the contacts page
				router.push("/contacts");

				clearMessages();
			}
		} catch (error) {
			setLoading(false);
			setErrorMsg(error.message);
			clearMessages();
		}
	};

	return (
		<Grid className={classes.root} spacing={2} justify="center" container>
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
			<Hidden xsDown>
				<Grid item sm={6}>
					<Box>
						<img src="/info.svg" alt="auth image" style={{ width: "90%" }} />
					</Box>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={6}>
				<Typography
					style={{ color: "rgba(0,0,0,0.6)", fontWeight: 700 }}
					component="h1"
					variant="h5">
					Add Contact Details
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography style={{ color: "rgba(0,0,0,0.6)" }}>
								Full Name
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								id="fullName"
								name="fullName"
								autoComplete="fullName"
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography style={{ color: "rgba(0,0,0,0.6)" }}>
								Phone Number
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								name="phone"
								type="text"
								id="phone"
								autoComplete="phone"
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography style={{ color: "rgba(0,0,0,0.6)" }}>
								Email
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								name="email"
								type="email"
								id="email"
								autoComplete="email"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={{
							background: "#32506D",
							border: "1px solid #32506D",
							color: "#fff",
						}}
						className={classes.submit}>
						{loading ? (
							<CircularProgress size="2em" style={{ color: "#fff" }} />
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</Grid>
		</Grid>
	);
}
