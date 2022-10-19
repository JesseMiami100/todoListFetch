import React, {useState, useEffect} from "react";

//get the fetch from postman
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState(""); 

	useEffect(() => {
		getList();
	}, [])
	
	
		const handleSubmit = (event) => {
			event.preventDefault()
			if (input != ""){
				let addTask = {
					id: Math.floor(Math.random() * 1000),
					text: input,
					completed: false
				}
				console.log(tasks)
				setTasks([...tasks, addTask])
				addTask(addTask)
				console.log(tasks)
				setInput("")
			}
		} 
	
	const getList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jesse")
		.then((response => response.json()))
		.then((result => setTasks(result)))
		.catch((error) => console.log("error", error))
	}


  const addTask = (myTask) => {          
	const newList = [...tasks, myTask]
	fetch("https://assets.breatheco.de/apis/fake/todos/user/jesse",{
		method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newList),
		redirect: 'follow'
	})
		.then(response => response.json())
		.then(result => getList())
		.catch((error) => console.log("error", error));
  }  

    console.log(tasks)

	return (
		<div className="text-center">
			<h1 className="todo">todos</h1>
			<div className="list-card">
				<form onSubmit={handleSubmit}>
					<input 
						type="text" 
						value={input}
						onChange={event => setInput(event.target.value)}
						className="input-box"
						placeholder="No tasks, add a task"
						/>
				</form>
				<div className="list-items">
					{tasks.map((x)=>(
							<div className="todo" key={x.id}>
								<p>{x?.label}
								 	<button 
										className="button" 
								 		onClick={ () => deleteTask(x.id) }>
											&#10060;
									</button>
								</p>
						    </div>
						)
					)}
						{/* <p className="counter">{ tasks.length > 0 ? "one task left" : `task left : ${tasks.length}`}</p> */}
				</div>
			</div>
		</div>
	);
};

export default Home;
