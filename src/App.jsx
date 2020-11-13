import React, { useEffect } from "react";
import { IonApp, isPlatform } from "@ionic/react";

import { AndroidFullScreen } from "@ionic-native/android-full-screen";
import { StatusBar } from "@ionic-native/status-bar";

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

import Home from "./pages/Home";

const App = () => {
	useEffect(() => {
		StatusBar.backgroundColorByHexString("#222428");
		if (!isPlatform("desktop") && !isPlatform("mobileweb")) {
			AndroidFullScreen.isImmersiveModeSupported()
				.then(() => AndroidFullScreen.immersiveMode())
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<IonApp>
			<Home />
		</IonApp>
	);
};

export default App;
