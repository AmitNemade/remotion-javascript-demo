/* eslint-disable no-unused-vars */
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import DisplayCode from './DisplayCode';
import ExecutionContext from './ExecutionContext';
import ThankyouScreen from './ThankyouScreen';
import WelcomeScreen from './WelcomeScreen';

/*

1. Show code [0,29 ]  - 1sec
2. show empty execution table [40, 70] - 1sec

***MEMORY ALLOCATION***
1. line 1
    1. highlight line 1 after 1 sec [100, 190]
    2. show n variable in memory after 1 sec at 130
    3. assign undefined to n after 1 sec at 160
2. line 2
    1. highlight line 2 - 5 at [190, 330]
    2. show square variable in memory after 1 sec at 210
    3. start function move animation after 1 sec at 240
    4. assign {...} to square after 1 sec at 300
3. line 6
    1. highlight line 6 at [330, 390]
    2. show square1 variable in memory after 1 sec at 360
    3. assign undefined to square1 after 1 sec at 390
4. line 7
    1. highlight line 7 at [390, 480]
    2. show square2 variable in memory after 1 sec at 420
    3. assign undefined to square2 after 1 sec at 450
***MEMORY ALLOCATED SUCCESSFULLY***
2 sec pause
***CODE EXECUTION***

1. Execution table 1 comes at [480, 510]
***INNER MEMORY ALLOCATION***

1. line 2
    1. highlight line 2 at [510, 600]
    2. show num variable in memory after 1 sec at 540
    3. assign undefined to num after 1 sec at 570
2. line 2
    1. highlight line 2 at [600, 690]
    2. show ans variable in memory after 1 sec at 630
    3. assign undefined to ans after 1 sec at 660
***INNER MEMORY ALLOCATED SUCCESSFULLY***
2 sec pause
***CODE EXECUTION*** start at 750
	

1. Execution table 2 comes at [750, 580]
***INNER MEMORY ALLOCATION***

1. line 2
    1. highlight line 2 at [780, 870]
    2. show num variable in memory after 1 sec at 810
    3. assign undefined to num after 1 sec at 840
2. line 2
    1. highlight line 2 at [900, 990]
    2. show ans variable in memory after 1 sec at 930
    3. assign undefined to ans after 1 sec at 960
***INNER MEMORY ALLOCATED SUCCESSFULLY***


*/
const WELCOME_SCREEN_START_TIME = 0;
const WELCOME_DURATION = 435;
const CODE_DEMO_START_TIME = 0;
const EXECUTION_START_TIME = CODE_DEMO_START_TIME + 40;
const EXECUTION_START_TIME1 = EXECUTION_START_TIME + 620;
const EXECUTION_START_TIME2 = EXECUTION_START_TIME1 + 500 + 60;
const EXECUTION_START_TIME3 = EXECUTION_START_TIME2 + 470 + 60;
const THANKYOU_SCREEN_START_TIME = EXECUTION_START_TIME3;
export const MAIN_EXECUTION_TABLE_WIDTH = 800;
export const MAIN_EXECUTION_TABLE_HEIGHT = 600;

const codeJSON = [
	{
		line: 'var n = 2',
		highlightAt: [
			[CODE_DEMO_START_TIME + 100, CODE_DEMO_START_TIME + 190],
			[EXECUTION_START_TIME + 470, EXECUTION_START_TIME + 530],
		],
	},
	{
		highlightAt: [
			[CODE_DEMO_START_TIME + 190, CODE_DEMO_START_TIME + 330],
			[EXECUTION_START_TIME + 530, EXECUTION_START_TIME + 590],
			[EXECUTION_START_TIME1, EXECUTION_START_TIME1 + 90],
			[EXECUTION_START_TIME1 + 180, EXECUTION_START_TIME1 + 300],
			[EXECUTION_START_TIME2, EXECUTION_START_TIME2 + 90],
			[EXECUTION_START_TIME2 + 180, EXECUTION_START_TIME2 + 300],
		],
		line: 'function square(num) {',
		innerCode: [
			{
				line: 'var ans = num * num',
				highlightAt: [
					[CODE_DEMO_START_TIME + 190, CODE_DEMO_START_TIME + 330],
					[EXECUTION_START_TIME1 + 90, EXECUTION_START_TIME1 + 150],
					[EXECUTION_START_TIME1 + 300, EXECUTION_START_TIME1 + 440],
					[EXECUTION_START_TIME2 + 90, EXECUTION_START_TIME2 + 150],
					[EXECUTION_START_TIME2 + 300, EXECUTION_START_TIME2 + 440],
				],
			},
			{
				line: 'return ans;',
				highlightAt: [
					[CODE_DEMO_START_TIME + 190, CODE_DEMO_START_TIME + 330],
					[EXECUTION_START_TIME1 + 150, EXECUTION_START_TIME1 + 180],
					[EXECUTION_START_TIME1 + 440, EXECUTION_START_TIME1 + 490],
					[EXECUTION_START_TIME2 + 150, EXECUTION_START_TIME2 + 180],
					[EXECUTION_START_TIME2 + 440, EXECUTION_START_TIME2 + 490],
				],
			},
		],
	},
	{
		line: '}',
		highlightAt: [[CODE_DEMO_START_TIME + 190, CODE_DEMO_START_TIME + 330]],
	},
	{
		linebreak: true,
	},
	{
		line: 'var sqaure1  = square(n)',
		highlightAt: [
			[CODE_DEMO_START_TIME + 330, CODE_DEMO_START_TIME + 420],
			[EXECUTION_START_TIME + 590, EXECUTION_START_TIME + 620],
			[EXECUTION_START_TIME1 + 490, EXECUTION_START_TIME1 + 520],
		],
	},
	{
		line: 'var sqaure2  = square(4)',
		highlightAt: [
			[CODE_DEMO_START_TIME + 420, CODE_DEMO_START_TIME + 510],
			[EXECUTION_START_TIME1 + 520, EXECUTION_START_TIME1 + 550],
			[EXECUTION_START_TIME2 + 490, EXECUTION_START_TIME2 + 520],
		],
	},
];

const memoryJSON = [
	{
		variableName: 'n',
		valAtMemory: 'undefined',
		valAtExecution: '2',
		showAt: 130 - EXECUTION_START_TIME,
		memoryAllocatedAt: 160 - EXECUTION_START_TIME,
		executedAt: CODE_DEMO_START_TIME + 525,
	},
	{
		variableName: 'square',
		valAtMemory: '{...}',
		valAtExecution: '{...}',
		showAt: 210 - EXECUTION_START_TIME,
		memoryAllocatedAt: 265 - EXECUTION_START_TIME,
		executedAt: 600 - EXECUTION_START_TIME,
	},
	{
		variableName: 'square1',
		valAtMemory: 'undefined',
		valAtExecution: '4',
		showAt: 360 - EXECUTION_START_TIME,
		memoryAllocatedAt: 390 - EXECUTION_START_TIME,
		executedAt: EXECUTION_START_TIME1 + 450,
	},
	{
		variableName: 'square2',
		valAtMemory: 'undefined',
		valAtExecution: '16',
		showAt: 420 - EXECUTION_START_TIME,
		memoryAllocatedAt: 450 - EXECUTION_START_TIME,
		executedAt: EXECUTION_START_TIME2 + 450,
	},
];
const executionJSON = [
	{
		line: 'n = 2',
		showAt: CODE_DEMO_START_TIME + 470,
		moveAt: CODE_DEMO_START_TIME + 500,
		completeAt: CODE_DEMO_START_TIME + 530,
	},
];
// Reference time - EXECUTION_START_TIME1
const memoryJSON1 = [
	{
		variableName: 'num',
		valAtMemory: 'undefined',
		valAtExecution: '2',
		showAt: 30,
		memoryAllocatedAt: 60,
		executedAt: 265,
	},
	{
		variableName: 'ans',
		valAtMemory: 'undefined',
		valAtExecution: '4',
		showAt: 90,
		memoryAllocatedAt: 120,
		executedAt: 405,
	},
];
const executionJSON1 = [
	{
		line: 'num = 2',
		showAt: 210,
		moveAt: 240,
		completeAt: 270,
	},
	{
		line: 'ans = num * num',
		showAt: 330,
		completedAt: 360,
	},
	{
		line: 'ans = 2 * 2',
		showAt: 360,
		moveAt: 390,
		completeAt: 410,
	},
];

const memoryJSON2 = [
	{
		variableName: 'num',
		valAtMemory: 'undefined',
		valAtExecution: '4',
		showAt: 30,
		memoryAllocatedAt: 60,
		executedAt: 265,
	},
	{
		variableName: 'ans',
		valAtMemory: 'undefined',
		valAtExecution: '16',
		showAt: 90,
		memoryAllocatedAt: 120,
		executedAt: 405,
	},
];
const executionJSON2 = [
	{
		line: 'num = 4',
		showAt: 210,
		moveAt: 240,
		completeAt: 270,
	},
	{
		line: 'ans = num * num',
		showAt: 330,
		completedAt: 360,
	},
	{
		line: 'ans = 4 * 4',
		showAt: 360,
		moveAt: 390,
		completeAt: 410,
	},
];

const MainDemo = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const firstZoomProgress = spring({
		frame: frame - EXECUTION_START_TIME1 - WELCOME_DURATION,
		fps,
		config: {damping: 200},
	});

	const firstZoomScale = interpolate(firstZoomProgress, [0, 1], [1, 1.35]);

	return (
		<AbsoluteFill
			style={{
				background: '#4e00f9',
				transform: `scale(${firstZoomScale})`,
			}}
		>
			<Sequence
				from={WELCOME_SCREEN_START_TIME}
				durationInFrames={WELCOME_DURATION}
			>
				<WelcomeScreen />
			</Sequence>
			<Sequence
				from={WELCOME_DURATION}
				durationInFrames={THANKYOU_SCREEN_START_TIME - CODE_DEMO_START_TIME}
			>
				<DisplayCode codeJSON={codeJSON} />
			</Sequence>
			<Sequence
				from={WELCOME_DURATION + EXECUTION_START_TIME}
				durationInFrames={THANKYOU_SCREEN_START_TIME - EXECUTION_START_TIME}
			>
				<ExecutionContext
					memoryJSON={memoryJSON}
					executionJSON={executionJSON}
					tableWidth={MAIN_EXECUTION_TABLE_WIDTH}
					tableHeight={MAIN_EXECUTION_TABLE_HEIGHT}
					title="Global Execution"
				/>
			</Sequence>
			<Sequence
				from={WELCOME_DURATION + EXECUTION_START_TIME1}
				durationInFrames={EXECUTION_START_TIME2 - EXECUTION_START_TIME1}
			>
				<ExecutionContext1
					memoryJSON={memoryJSON1}
					executionJSON={executionJSON1}
				/>
			</Sequence>
			<Sequence
				from={WELCOME_DURATION + EXECUTION_START_TIME2}
				durationInFrames={525}
			>
				<ExecutionContext2
					memoryJSON={memoryJSON2}
					executionJSON={executionJSON2}
				/>
			</Sequence>
			<Sequence
				from={WELCOME_DURATION + THANKYOU_SCREEN_START_TIME}
				durationInFrames={100}
			>
				<ThankyouScreen />
			</Sequence>
		</AbsoluteFill>
	);
};

const ExecutionContext1 = ({memoryJSON, executionJSON}) => {
	const {width, height} = useVideoConfig();
	return (
		<div
			style={{
				transform: `translate(${width / 4}px, -12%) scale(0.5)`,
			}}
		>
			<ExecutionContext
				memoryJSON={memoryJSON}
				executionJSON={executionJSON}
				tableWidth={MAIN_EXECUTION_TABLE_WIDTH}
				tableHeight={MAIN_EXECUTION_TABLE_HEIGHT / 2}
				closingAt={EXECUTION_START_TIME2 - 60 - 30 - EXECUTION_START_TIME1}
				title="Funtion Execution Context"
			/>
		</div>
	);
};
const ExecutionContext2 = ({memoryJSON, executionJSON}) => {
	const {width, height} = useVideoConfig();
	return (
		<div
			style={{
				transform: `translate(${width / 4}px, -9%) scale(0.5)`,
			}}
		>
			<ExecutionContext
				memoryJSON={memoryJSON}
				executionJSON={executionJSON}
				tableWidth={MAIN_EXECUTION_TABLE_WIDTH}
				tableHeight={MAIN_EXECUTION_TABLE_HEIGHT / 2}
				closingAt={EXECUTION_START_TIME3 - 60 - EXECUTION_START_TIME2}
				title="Funtion Execution Context"
			/>
		</div>
	);
};

export default MainDemo;
