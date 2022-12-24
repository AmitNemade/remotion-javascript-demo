/* eslint-disable no-unused-vars */
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';

const TableContainer = styled.div`
	border: 2px solid black;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	position: absolute;
	display: flex;
	flex-direction: column;
`;
const TableHeader = styled.div`
	border-bottom: 2px solid black;
	width: ${(props) => props.width / 2}px;
	text-align: center;
	font-size: 36px;
	font-weight: 600;
	line-height: 1.5;
`;
const CodeLine = styled.div`
	text-align: start;
	font-size: 24px;
	line-height: 1.5;
`;

const ExecutionContext = ({
	memoryJSON,
	executionJSON,
	tableWidth,
	tableHeight,
	closingAt,
	title,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const firstMoveProgress = spring({
		frame,
		fps,
		// Config: {damping: 200},
	});
	const firstMoveX = interpolate(
		firstMoveProgress,
		[0, 1],
		[width * 0.35 - tableWidth / 2, width * 0.35 - tableWidth / 2]
	);
	const firstMoveY = interpolate(
		firstMoveProgress,
		[0, 1],
		[height * 0.75 - tableHeight / 2, height / 2 - tableHeight * 0.6]
	);

	const closingMoveProgress = spring({
		frame: frame - closingAt,
		fps: fps * 1.5,
		config: {damping: 200},
	});
	const closingMoveX = interpolate(
		closingMoveProgress,
		[0, 1],
		[width / 3 - tableWidth / 2, -width * 0.5 + tableWidth / 2],
		{extrapolateRight: 'clamp'}
	);
	const closingMoveY = interpolate(
		closingMoveProgress,
		[0, 1],
		[height / 2 - tableHeight / 2, height * 0.49 - tableHeight / 2]
	);
	const scaleClosingMove = interpolate(closingMoveProgress, [0, 1], [1, 0.15]);
	const opacityClosingMove = interpolate(closingMoveProgress, [0.8, 1], [1, 0]);

	return (
		<TableContainer
			style={{
				top: `${
					closingAt
						? frame > closingAt
							? closingMoveY
							: firstMoveY
						: firstMoveY
				}px`,
				left: `${
					closingAt
						? frame > closingAt
							? closingMoveX
							: firstMoveX
						: firstMoveX
				}px`,
				position: 'absolute',
				transform: `scale(${
					closingAt ? (frame > closingAt ? scaleClosingMove : 1) : 1
				})`,
				opacity: closingAt ? (frame > closingAt ? opacityClosingMove : 1) : 1,
			}}
			width={tableWidth}
			height={tableHeight}
		>
			{title && (
				<div style={{width: '100%', display: 'flex'}}>
					<TableHeader
						width={tableWidth}
						style={{
							width: `${tableWidth}px`,
							color: '#fff',
							fontSize: 24,
							background: '#2f1074',
						}}
					>
						{title}
					</TableHeader>
				</div>
			)}
			<div style={{width: '100%', display: 'flex'}}>
				<TableHeader
					width={tableWidth}
					style={{width: `${tableWidth / 2 - 100}px`}}
				>
					Memory Creation
				</TableHeader>
				<TableHeader
					style={{
						width: `${tableWidth / 2 + 100}px`,
						borderLeft: '2px solid black',
					}}
				>
					Code Execution
				</TableHeader>
			</div>
			<div style={{tableWidth: '100%', height: '100%', display: 'flex'}}>
				{/* Memory Allocation Column */}
				<div
					style={{
						height: '100%',
						width: `${tableWidth / 2 - 100}px`,
						padding: '16px',
					}}
				>
					{memoryJSON?.map((line, index) => {
						if (line.showAt < frame) {
							return (
								<CodeLine key={index}>
									{line.variableName} :{' '}
									{line.executedAt < frame
										? line.valAtExecution
										: line.memoryAllocatedAt < frame
										? line.valAtMemory
										: ''}
								</CodeLine>
							);
						}
						return null;
					})}
				</div>

				{/* Code Column */}
				<div
					style={{
						height: '100%',
						width: `${tableWidth / 2 + 100}px`,
						borderLeft: '2px solid black',
						padding: '16px',
					}}
				>
					{executionJSON?.map((line, index) => {
						return (
							<ExecutionLine
								key={index}
								data={line}
								tableWidth={tableWidth}
								tableHeight={tableHeight}
							/>
						);
					})}
				</div>
			</div>
		</TableContainer>
	);
};

const ExecutionLine = ({data, tableHeight, tableWidth}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	if (frame < data.showAt || frame > data.completedAt) return;

	const lineMoveProgress = spring({
		frame: frame - (data.moveAt ?? data.completedAt - 10),
		fps: data.moveAt ? 2 * fps : fps,
		config: {damping: 200},
	});
	const lineMoveX = interpolate(
		lineMoveProgress,
		[0.2, 1],
		[0, -tableWidth / 3],
		{extrapolateLeft: 'clamp'}
	);
	const lineMoveY = interpolate(lineMoveProgress, [0.2, 1], [0, 0], {
		extrapolateLeft: 'clamp',
	});
	const opacity = interpolate(
		lineMoveProgress,
		[data.moveAt ? 0.8 : 0.5, 1],
		[1, 0]
	);

	return (
		<CodeLine
			style={{
				transform: `translate(${data.moveAt ? lineMoveX : 0}px, ${
					data.moveAt ? lineMoveY : 0
				}px)`,
				opacity,
			}}
		>
			{data.line}
		</CodeLine>
	);
};

export default ExecutionContext;
