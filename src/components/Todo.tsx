import {useState, KeyboardEvent} from 'react';

const Todo = (): JSX.Element => {
	interface ListItem {
		id: number;
		value: string;
	}
	const [list, setList] = useState<ListItem[]>([]);

	const createList = (e: KeyboardEvent<HTMLInputElement>) => {
		// value 값을 뽑을수 없는 이벤트객체는 e.textContent
		let eventObj = e.target as HTMLInputElement;
		if (e.code === 'Enter') {
			console.log(list);
			let newItem: ListItem;
			if (list.length !== 0) {
				newItem = {id: list[list.length - 1].id + 1, value: eventObj.value}; //고유한 아이디
			} else {
				newItem = {id: 0, value: eventObj.value};
			}
			setList([...list, newItem]);
			eventObj.value = '';
		}
	};

	const btnUpdate = (item: ListItem) => {
		let value: string = window.prompt('변경할 값을 입력해주세요') as string;
		const newList: ListItem[] = list.map((cur): ListItem => {
			if (cur.id === item.id) cur.value = value;
			return cur;
		});
		setList(newList);
	};

	const btnDelete = (item: ListItem) => {
		let newList = list.filter((cur) => cur.id !== item.id);
		setList(newList);
	};

	return (
		<>
			<h1>TODO LIST</h1>
			<input type="text" onKeyPress={(e) => createList(e)} />
			{/* //onInput={} */}
			<ul>
				{list.map((cur, idx) => (
					<li key={`${idx}_${new Date().toString()}`}>
						{cur.value}
						<button onClick={() => btnUpdate(cur)}>수정</button>
						<button onClick={() => btnDelete(cur)}>삭제</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Todo;
