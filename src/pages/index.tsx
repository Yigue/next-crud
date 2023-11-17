import React from "react";
import { task } from "src/types.d";
interface props {
  tasks: task[];
}
function index({ tasks }: props) {
  return (
    <div>{tasks.length === 0 ? <h1>No tienes Tareas</h1> : 
    tasks.map((task,i)=>{
      return <div key={i}>{task.title}</div>
    })}</div>
  );
}

export default index;
//ejecutar codigo desde el backed

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  console.log(tasks);

  // retorna un objecto props con las props que va a recibir el componnent
  return {
    props: {
      tasks,
    },
  };
};
