import {useEffect, useRef, useState} from 'react';

const Value_extraction = (onoff: boolean) => {
	interface textVlaue {
		target?: HTMLInputElement;
		current?: HTMLParagraphElement;
	}

	//값을 임의로 지정
	const pRef = useRef(null); //초기값은 대부분 null
	const inputRef = useRef(null);
	const [count, setCount] = useState(0);
	const [cash, setCach] = useState(1000);

	//useEffect(() => {실행될 구문},[추적할state]);
	//[추적할state] 가 없이 useEffect(() => {}) 일경우 모든 state 값 변경시 구문 실행
	//비어있는 [] 일경우 랜더링 후 최초 1회만 실행
	//생명주기 조건에 따라 useEffect() 은 여러개 사용이 가능하며 순차적으로 실행됩니다
	//useEffect(() => { return console.log('해당 컴퍼넌트가 브라우져에서 없어질때 마다 실행') })

	useEffect(() => {
		console.log(pRef.current.textContent);
		console.log(pRef.current.style.color);

		console.log(inputRef.current.value);
		//자식 컴포넌트가 사라졌을때
		return console.log(onoff, '해당컴퍼넌트가 사려졌습니다');
	}, [onoff]);

	const getValue = (e: any, textEl: string) => {
		let result;

		if (textEl === 'address') {
			result = e.target.previousElementSibling.textContent;
			// console.log(result);
		} else {
			const {
				target: {value},
			} = e;
			result = value;
		}
		console.log(`${textEl} : ${result}`);
		//이벤트 객체의 타입지정 오류
	};

	return (
		<>
			<br />
			<h2>값추출을 연습하는 것이다!</h2>
			<strong>임의의 텍스트값 인수로 분별 추출</strong>
			<div>
				<label style={{display: 'block'}}>
					age:
					<input type="text" onInput={(e) => getValue(e, 'age')} />
				</label>
				<br />
				<label>
					name:
					<input type="text" onInput={(e) => getValue(e, 'name')} />
				</label>
				<br />
				<div>
					address: <span>내부에 벨류속성이 없는 값</span>
					<button onClick={(e) => getValue(e, 'address')}>값 추출</button>
				</div>
			</div>
			<hr />

			<strong>기본적인 useState 활용</strong>
			<div>
				<span>{cash}원</span>
				<button onClick={() => setCach(() => cash + 1000)}>추가</button>
				<br />
				<span>{count}</span>
				<button onClick={() => setCount((num) => ++num)}>증가</button>
			</div>
			<hr />

			<strong>이벤트 핸들러로 값을 축출할수 없는경우 ref를 활용</strong>
			<div>
				<p className="text01" ref={pRef} style={{color: 'green'}}>
					ref 값을 가진 텍스트입니다.
				</p>

				<label>
					국적 :
					<input type="text" ref={inputRef} defaultValue={'한국'} readOnly />
				</label>
			</div>
		</>
	);
};

export default Value_extraction;
