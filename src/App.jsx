import React, { useState, useEffect } from "react";
import { IonApp, isPlatform } from "@ionic/react";

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

import { SpeechRecognition as speechRecognitionMobile } from "@ionic-native/speech-recognition";

import { AndroidFullScreen } from "@ionic-native/android-full-screen";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

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
	const [voiceInput, setVoiceInput] = useState("");
	const [inputType, setInputType] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const { transcript, resetTranscript } = useSpeechRecognition();

	const [resetGame, setResetGame] = useState(false);

	useEffect(() => {
		if (!isPlatform("desktop") && !isPlatform("mobileweb")) {
			AndroidFullScreen.isImmersiveModeSupported()
				.then(() => AndroidFullScreen.immersiveMode())
				.catch((err) => console.log(err));

			speechRecognitionMobile.hasPermission().then((hasPermission) => {
				if (!hasPermission) {
					speechRecognitionMobile.requestPermission().then(
						() => console.log("Granted"),
						() => console.log("Denied")
					);
				}
			});
		}
	}, []);

	useEffect(() => {
		setVoiceInput(transcript);
	}, [transcript]);

	let gridSize = window.innerWidth;

	if (gridSize > 583) {
		gridSize = 583;
	}

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(resetTranscript);
		return null;
	}

	return (
		<ThemeProvider theme={theme}>
			<IonApp>
				<CssBaseline />
				<div className={classes.appContainer}>
					<Pacman
						gridSize={gridSize / 28}
						input={inputType ? voiceInput : direction}
						resetGame={resetGame}
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
							onMouseDown={() => {
								setIsListening(true);
								SpeechRecognition.startListening();
							}}
							onMouseUp={() => {
								SpeechRecognition.stopListening();
								setIsListening(false);
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

						<Button
							variant="contained"
							color="secondary"
							component="span"
							onClick={() => setResetGame(!resetGame)}
						>
							Reset
						</Button>

						<Typography variant="body2">{voiceInput}</Typography>
					</Paper>
				</div>
			</IonApp>
		</ThemeProvider>
	);
};

export default App;
