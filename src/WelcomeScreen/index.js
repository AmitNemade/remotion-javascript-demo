/* eslint-disable no-unused-vars */
import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import redHeart from '../assets/red_heart.svg';

const WelcomeScreen = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const line1Progress = spring({frame, fps: fps * 3});
	const opacityChange = interpolate(line1Progress, [0, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp ',
	});
	const line2Progress = spring({frame: frame - 75, fps: fps * 3});
	const width2Change = interpolate(line2Progress, [0, 1], [0, 785], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp ',
	});
	const line3Progress = spring({frame: frame - 75, fps: fps * 3});
	const scale3Change = interpolate(line3Progress, [0, 1], [0, 785], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp ',
	});

	const DescriptionStartAt = 315;

	if (frame < DescriptionStartAt - 30) {
		return (
			<div>
				<div
					style={{
						color: 'white',
						position: 'absolute',
						top: '25%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						fontSize: 92,
						fontWeight: 'semibold',
						letterSpacing: '1px',
						transformOrigin: 'center',
						width: `1390px`,
						overflow: 'hidden',
						display: 'block',
						opacity: `${opacityChange}`,
					}}
				>
					<div style={{width: 'max-content'}}>
						How code is executed in JavaScript
					</div>
				</div>
				<div
					style={{
						color: 'black',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						fontSize: 64,
						fontWeight: 'semibold',
						letterSpacing: '1px',
						transformOrigin: 'center',
						width: `${width2Change}px`,
						overflow: 'hidden',
						display: 'block',
					}}
				>
					<div style={{width: 'max-content'}}>
						Made in{' '}
						<Img
							src={redHeart}
							width={72}
							height={72}
							style={{marginBottom: '-12px'}}
						/>{' '}
						using JavaScript
					</div>
				</div>
				{frame > 165 && (
					<div
						style={{
							color: 'white',
							position: 'absolute',
							top: '60%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							fontSize: 32,
							fontWeight: 'lighter',
							letterSpacing: '1px',
							transformOrigin: 'center',
							width: `510px`,
							scale: `${scale3Change}px`,
							overflow: 'hidden',
							display: 'block',
						}}
					>
						<div style={{width: 'max-content'}}>
							{frame > 195 && <span>#ReactJS</span>}
							{frame > 225 && (
								<span style={{marginLeft: 24, marginRight: 24}}>
									#JavaScript
								</span>
							)}
							{frame > 255 && <span>#Remotion</span>}
						</div>
					</div>
				)}
			</div>
		);
	}
	if (frame < DescriptionStartAt)
		return (
			<div
				style={{
					color: 'white',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: 64,
					fontWeight: 'semibold',
					letterSpacing: '1px',
					transformOrigin: 'center',
					width: `290px`,
					overflow: 'hidden',
					display: 'block',
				}}
			>
				<div style={{width: 'max-content'}}>Let's Start</div>
			</div>
		);

	return (
		<div
			style={{
				color: 'white',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				letterSpacing: '1px',
				transformOrigin: 'center',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				width: 1200,
			}}
		>
			<div style={{fontSize: 48, fontWeight: 'semibold'}}>
				While executing a JavaScript code, JavaScript engine create a special
				environment to execute the code which is known as{' '}
				<b>Execution Context</b>.<br />
				<br />
				In this execution context, code is executed in two phase
				<ul style={{listStyleType: 'decimal'}}>
					<li style={{marginLeft: 14}}>
						<u>Memory Creation Phase</u> -{' '}
						<span style={{fontSize: 32, fontWeight: 'normal', lineHeight: 1.5}}>
							Memory is allocated to each variables and undefined is assigned as
							value
						</span>
					</li>
					<li style={{marginTop: 12, marginLeft: 14}}>
						<u>Execution Phase</u> -{' '}
						<span style={{fontSize: 32, fontWeight: 'normal', lineHeight: 1.5}}>
							Acutal code gets executed in this phase
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default WelcomeScreen;
