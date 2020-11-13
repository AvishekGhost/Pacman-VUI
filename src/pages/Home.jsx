import React, { useState, useEffect } from "react";

import { IonContent, IonButton, IonIcon, IonText } from "@ionic/react";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import {
	mic,
	micOff,
	arrowForward,
	arrowDown,
	arrowBack,
	arrowUp,
} from "ionicons/icons";

import Pacman from "../components/Pacman";
import classes from "./Home.module.css";

const Home = () => {
	const [direction, setDirection] = useState(null);
	const [voiceInput, setVoiceInput] = useState("");
	const [inputType, setInputType] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const { transcript, resetTranscript } = useSpeechRecognition();
	const [resetGame, setResetGame] = useState(false);

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
		<IonContent color="light">
			<div className={classes.appContainer}>
				<Pacman
					gridSize={gridSize / 28}
					input={inputType ? voiceInput : direction}
					resetGame={resetGame}
				/>
				<div elevation={3} className={classes.inputContainer}>
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
				<div elevation={3} className={classes.micContainer}>
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
						{!isListening ? <IonIcon icon={mic} /> : <IonIcon icon={micOff} />}
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
				</div>
				<IonText>{voiceInput}</IonText>
			</div>
		</IonContent>
	);
};

export default Home;
