import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const ThankyouScreen = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const welcomeProgress = spring({frame, fps: fps * 3});
	const widthChange = interpolate(welcomeProgress, [0, 1], [0, 1050]);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				fontSize: 92,
				fontWeight: 'bold',
				letterSpacing: '1px',
				transformOrigin: 'center',
				width: `${widthChange}px`,
				overflow: 'hidden',
			}}
		>
			<div style={{width: 'max-content'}}>Thank you for watching.</div>
		</div>
	);
};

export default ThankyouScreen;
