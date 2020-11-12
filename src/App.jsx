import React, { useState, useEffect } from "react";

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

import {
	IonApp,
	isPlatform,
	IonContent,
	IonButton,
	IonIcon,
	IonText,
} from "@ionic/react";

import { AndroidFullScreen } from "@ionic-native/android-full-screen";
import {
	mic,
	micOff,
	arrowForward,
	arrowDown,
	arrowBack,
	arrowUp,
} from "ionicons/icons";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import Pacman from "./components/Pacman";

const styles = {
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
};

const App = () => {
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
		<IonApp>
			<IonContent>
				<div style={styles.appContainer}>
					<Pacman
						gridSize={gridSize / 28}
						input={inputType ? voiceInput : direction}
						resetGame={resetGame}
					/>
					<div elevation={3} style={styles.inputContainer}>
						<IonButton onClick={() => setDirection("up")}>
							<IonIcon icon={arrowUp} />
						</IonButton>
						<div>
							<IonButton onClick={() => setDirection("left")}>
								<IonIcon icon={arrowBack} />
							</IonButton>
							<IonButton onClick={() => setDirection("down")}>
								<IonIcon icon={arrowDown} />
							</IonButton>
							<IonButton onClick={() => setDirection("right")}>
								<IonIcon icon={arrowForward} />
							</IonButton>
						</div>
					</div>
					<div elevation={3} style={styles.micContainer}>
						<IonButton
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
								<IonIcon icon={mic} />
							) : (
								<IonIcon icon={micOff} />
							)}
						</IonButton>

						<IonButton
							variant="contained"
							color="primary"
							component="span"
							onClick={() => setInputType(!inputType)}
						>
							Change Input ({inputType ? "voice" : "btn"})
						</IonButton>

						<IonButton
							variant="contained"
							color="danger"
							onClick={() => setResetGame(!resetGame)}
						>
							Reset
						</IonButton>

						<IonText>{voiceInput}</IonText>
					</div>
				</div>
			</IonContent>
		</IonApp>
	);
};

export default App;
