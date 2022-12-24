/* eslint-disable no-unused-vars */
import {interpolate, spring} from 'remotion';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import {
	MAIN_EXECUTION_TABLE_HEIGHT,
	MAIN_EXECUTION_TABLE_WIDTH,
} from '../MainDemo';

const CODE_WIDTH = 500;
const CODE_HEIGHT = 440;
const CodeContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #000;
	color: #fff;
	padding: 24px 40px;
	border-radius: 20px;
	width: ${CODE_WIDTH}px;
	height: ${CODE_HEIGHT}px;
`;
const CodeLine = styled.div`
	display: flex;
	font-size: 28px;
	padding-left: 12px;
	padding-right: 12px;
	border-radius: 8px;
	margin-top: 4px;
	line-height: 1.5;
`;

const DisplayCode = ({codeJSON}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const firstMoveProgress = spring({
		frame,
		fps,
		// Config: {damping: 200}
	});
	const firstMoveX = interpolate(
		firstMoveProgress,
		[0, 1],
		[width / 2 - CODE_WIDTH / 2, width * 0.72 - CODE_WIDTH * 0.5]
	);
	const firstMoveY = interpolate(
		firstMoveProgress,
		[0, 1],
		[height / 2 - CODE_HEIGHT / 2, height / 2 - CODE_HEIGHT / 2]
	);

	const funcMoveProgress = spring({
		frame: frame - 240,
		fps: fps * 2,
		config: {damping: 200},
	});

	const funcMoveX = interpolate(
		funcMoveProgress,
		[0, 1],
		[40, -MAIN_EXECUTION_TABLE_WIDTH * 1.2]
	);
	const funcMoveY = interpolate(
		funcMoveProgress,
		[0, 1],
		[24 + 46, -MAIN_EXECUTION_TABLE_HEIGHT * 0.27]
	);
	const scalefunc = interpolate(funcMoveProgress, [0.5, 1], [1, 0.2], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const opacityfunc = interpolate(funcMoveProgress, [0.8, 1], [1, 0.4], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<CodeContainer
				style={{
					top: `${firstMoveY}px`,
					left: `${firstMoveX}px`,
					position: 'absolute',
				}}
			>
				<DisplayContent codeJson={codeJSON} frame={frame} />
				<div
					id="movefunc"
					style={{
						position: 'absolute',
						top: `${funcMoveY}px`,
						left: `${funcMoveX}px`,
						color: '#fff',
						width: `${CODE_WIDTH - 80}px`,
						height: `${CODE_HEIGHT}px`,
						transform: `scale(${scalefunc})`,
						opacity: opacityfunc,
						display: `${frame > 240 && frame < 270 ? 'block' : 'none'}`,
					}}
				>
					<DisplayContent
						codeJson={[
							{
								line: 'function square(num) {',
								innerCode: [
									{
										line: 'var ans = num * num',
									},
									{
										line: 'return ans;',
									},
								],
							},
							{
								line: '}',
							},
						]}
						frame={frame}
					/>
				</div>
			</CodeContainer>
		</>
	);
};

const DisplayContent = ({codeJson, frame}) => {
	return (
		<>
			{codeJson?.map((line, index) => {
				if (line.linebreak)
					return <CodeLine key={`outer${index}`}>&nbsp;</CodeLine>;
				return (
					<>
						<CodeLine
							key={`outer_${index}`}
							style={{
								background: `${
									line.highlightAt?.filter((e) => e[0] < frame && frame < e[1])
										.length > 0
										? 'rgba(255,255, 255, 1)'
										: 'transparent'
								}`,
								color: `${
									line.highlightAt?.filter((e) => e[0] < frame && frame < e[1])
										.length > 0
										? 'rgb(0, 0, 0)'
										: 'inherit'
								}`,
							}}
						>
							{line.line}
						</CodeLine>
						{line.innerCode?.map((innerLine, innerIndex) => {
							if (innerLine.linebreak)
								return (
									<CodeLine
										key={`inner_${innerIndex}`}
										style={{
											background: `${
												innerLine.highlightAt?.filter(
													(e) => e[0] < frame && frame < e[1]
												).length > 0
													? 'rgba(255,255, 255, 1)'
													: 'transparent'
											}`,
											color: `${
												innerLine.highlightAt?.filter(
													(e) => e[0] < frame && frame < e[1]
												).length > 0
													? 'rgb(0, 0, 0)'
													: 'inherit'
											}`,
										}}
									>
										&nbsp;
									</CodeLine>
								);
							return (
								<CodeLine
									key={`inner_${innerIndex}`}
									style={{
										paddingLeft: '20px',
										background: `${
											innerLine.highlightAt?.filter(
												(e) => e[0] < frame && frame < e[1]
											).length > 0
												? 'rgba(255,255, 255, 1)'
												: 'transparent'
										}`,
										color: `${
											innerLine.highlightAt?.filter(
												(e) => e[0] < frame && frame < e[1]
											).length > 0
												? 'rgb(0, 0, 0)'
												: 'inherit'
										}`,
									}}
								>
									{innerLine.line}
								</CodeLine>
							);
						})}
					</>
				);
			})}
		</>
	);
};

export default DisplayCode;
