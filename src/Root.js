// Each <Composition> is an entry in the sidebar!

import {Composition} from 'remotion';
import DisplayCode from './DisplayCode';
import ExecutionContext from './ExecutionContext';
import './index.css';
import MainDemo from './MainDemo';

export const RemotionRoot = () => {
	return (
		<>
			<Composition
				id="MainDemo"
				durationInFrames={2284}
				fps={30}
				width={1920}
				height={1080}
				component={MainDemo}
			/>
			<Composition
				id="ExecutionContext"
				durationInFrames={210}
				fps={30}
				width={1920}
				height={1080}
				component={ExecutionContext}
			/>
			<Composition
				id="DisplayCode"
				durationInFrames={210}
				fps={30}
				width={1920}
				height={1080}
				component={DisplayCode}
			/>
		</>
	);
};
