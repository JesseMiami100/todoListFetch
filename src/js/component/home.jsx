import React, {useState, useEffect} from "react";

//get the fetch from postman
const Home = () => {

	const [list, setlist] = useState([]); 
	const [toDo, settoDo] = useState(""); 

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jesse", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log("response", resp);

				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/jesse",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						console.log("response", resp);
						return resp.json();
					})
					.then(data => {
						setlist(data);
					})

					.catch(err => {
						console.log("error", err);
					});
			})

			.catch(err => {
				console.log("error", err);
			});
	}, []);
	const addToList = homework => {
		setlist([...list, { label: homework, done: false }]);
		settoDo("");
	};

	const delHW = pos => {
		const tempList = [...list];
		console.log("Erased", tempList);
		tempList.splice(pos, 1);
		console.log("Temporary list", tempList);
		const methods = ["PUT", "DELETE"];
		if (tempList.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/jesse",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					console.log("Deleted Response", resp);
					setlist(tempList);
					console.log(list);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/jesse",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			);
		}
	};

	const addtoDo = toDo => {
		settoDo(toDo);
	};

	const removeTask = i => {
		var newtask = list.filter((_, index) => index != i);
		setlist(newtask);
	};

	const validateInput = () => {
		if (toDo === "") alert("The input cannot be empty");
		else addToList(toDo);
	};
	return (
		<div>
			<div>
				<h2>To Do List</h2>
			</div>

			<div className="form-inline">
				<input
					className="form-control"
					type="text"
					placeholder="Add List"
					onChange={e => addtoDo(e.target.value)}
					value={toDo}></input>
				<button
					className="btn btn-info"
					type="submit"
					onClick={validateInput}>
					Add Task
				</button>
			</div>
			<div>
				<ul className="list-group">
					{list.map((element, i) => (
						<li
							className="list-group-item"
							key={i}
							onClick={() => removeTask(i)}>
							{element.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;
