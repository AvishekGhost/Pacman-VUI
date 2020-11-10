import React, { useState } from "react";
import { IonApp } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { IconButton, Button } from "@material-ui/core";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MicIcon from "@material-ui/icons/Mic";
import Typography from "@material-ui/core/Typography";
import MicOffIcon from "@material-ui/icons/MicOff";

import Pacman from "./components/Pacman";

import { useSpeechRecognition } from "react-speech-kit";

import { SpeechRecognition } from "@ionic-native/speech-recognition";

// const speechRecognition = SpeechRecognition();

const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

const useStyles = makeStyles((theme) => ({
	appContainer: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
	},
	inputContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	micContainer: {
		marginTop: 10,
	},
}));

const App = () => {
	const classes = useStyles();
	const [direction, setDirection] = useState(null);
	const [transcript, setTranscript] = useState("");
	const [inputType, setInputType] = useState(false);
	const [isListening, setIsListening] = useState(false);

	const { listen, listening, stop } = useSpeechRecognition({
		onResult: (result) => {
			setTranscript(result);
		},
	});

	let gridSize = window.innerWidth;

	if (gridSize > 583) {
		gridSize = 583;
	}

	return (
		<ThemeProvider theme={theme}>
			<IonApp>
				<CssBaseline />
				<div className={classes.appContainer}>
					<Pacman
						gridSize={gridSize / 28}
						input={inputType ? transcript : direction}
					/>
					<Paper elevation={3} className={classes.inputContainer}>
						<IconButton
							aria-label="delete"
							className={classes.margin}
							onClick={() => setDirection("up")}
						>
							<ArrowUpwardIcon fontSize="inherit" />
						</IconButton>
						<div>
							<IconButton
								aria-label="delete"
								className={classes.margin}
								onClick={() => setDirection("left")}
							>
								<ArrowBackIcon fontSize="inherit" />
							</IconButton>
							<IconButton
								aria-label="delete"
								className={classes.margin}
								onClick={() => setDirection("down")}
							>
								<ArrowDownwardIcon fontSize="inherit" />
							</IconButton>
							<IconButton
								aria-label="delete"
								className={classes.margin}
								onClick={() => setDirection("right")}
							>
								<ArrowForwardIcon fontSize="inherit" />
							</IconButton>
						</div>
					</Paper>
					<Paper elevation={3} className={classes.micContainer}>
						<IconButton
							aria-label="delete"
							className={classes.margin}
							onClick={() => {
								if (!isListening) {
									setIsListening(true);
									SpeechRecognition.startListening().subscribe(
										(matches) => console.log(matches),
										(onerror) => console.log("error:", onerror)
									);
								} else {
									setIsListening(false);
									SpeechRecognition.stopListening();
								}
							}}
						>
							{!isListening ? (
								<MicIcon fontSize="inherit" />
							) : (
								<MicOffIcon fontSize="inherit" />
							)}
						</IconButton>
						<Button
							variant="contained"
							color="primary"
							component="span"
							onClick={() => setInputType(!inputType)}
						>
							Change Input ({inputType ? "voice" : "btn"})
						</Button>
						<Typography variant="body2">{transcript}</Typography>
					</Paper>
				</div>
			</IonApp>
		</ThemeProvider>
	);
};

export default App;
