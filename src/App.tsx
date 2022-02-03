import './App.css';
import {useEffect, useState} from 'react';
import Todo from './components/Todo';
import Value_extraction from './components/Value_extraction';

function App() {
	const [onoff, setOnoff] = useState<boolean>(true);
	useEffect(() => {
		return console.log(onoff, '자식컴퍼넌트가 사려졌습니다');
	}, [onoff]);

	const btnDisplay = () => {
		if (onoff) {
			setOnoff(false);
		} else {
			setOnoff(true);
		}
	};
	return (
		<div className="App">
			<Todo />

			<br />
			<button onClick={btnDisplay}>토글용 버튼</button>

			{onoff && <Value_extraction {...onoff} />}
		</div>
	);
}

export default App;
