import React from "react";
import {
	Box,
	Typography,
	Input,
	IconButton,
	Dialog,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%",
		marginBottom: "2rem",
		// Fix IE 11 issue.
		// marginTop: theme.spacing(3),
	},
	submit: {
		fontWeight: "bold",
		marginTop: "1rem",
		marginBottom: "1rem",
		backgroundColor: "#32506D",
		color: "white",
		"&:hover": {
			backgroundColor: "#32506D",
			color: "white",
		},
	},
	profileInfo: {
		border: "1px solid #32506D",
		padding: "0.3em 1em",
		borderRadius: "5px",
	},
	imgArea: {
		height: "9rem",
		width: "9rem",
		background: "#32506D",
		marginLeft: "1rem",
		marginTop: "1rem",
		borderRadius: "4.5rem",
		border: "4px solid #fff",
		position: "absolute",
		zIndex: 1,
		padding: "2.5rem",
		[theme.breakpoints.down("xs")]: {
			marginTop: "1rem",
			height: "6rem",
			width: "6rem",
			padding: "1rem",
			borderRadius: "3rem",
		},
	},
	dialogRoot: {
		width: "100%",
		paddingLeft: "2em",
		paddingRight: "2em",
		marginBottom: "2em",
		borderRadius: "2em",
	},
	dialogbox: {
		"& .MuiDialog-paperWidthSm": {
			width: "50%",
			borderRadius: "2em",
		},
	},
}));

const EditContact = (props) => {
	const {
		open,
		handleClose,
		setFullName,
		setPhone,
		setEmail,
		fullName,
		email,
		phone,
		handleSubmit,
		update,
	} = props;

	const classes = useStyles();

	const editForm = (
		<Box className={classes.dialogRoot}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
					Edit Contact
				</Typography>
				<IconButton color="primary" component="span" onClick={handleClose}>
					<Close
						style={{
							height: "2rem",
							width: "2rem",
						}}
					/>
				</IconButton>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className={classes.form}>
				<Box>
					<Typography>Full Name</Typography>
					<Input
						className={classes.profileInfo}
						name="fullName"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						disableUnderline={true}
						fullWidth
						id="firstName"
						autoFocus
					/>

					<Typography>Phone Number</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="phone"
						name="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						autoComplete="phone"
					/>

					<Typography>Email Address</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={classes.submit}>
						{update ? "LOADING..." : "SAVE"}
					</Button>
				</Box>
			</form>
		</Box>
	);

	return (
		<div>
			<Dialog
				className={classes.dialogbox}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				aria-describedby="simple-dialog-description">
				{editForm}
			</Dialog>
		</div>
	);
};

export default EditContact;
