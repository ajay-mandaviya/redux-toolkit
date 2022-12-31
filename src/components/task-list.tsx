import { useContext } from 'react';
import { useSelector } from 'react-redux';
import ApplicationContext from '../context';
import Task from './task';
import { ApplicationStateType } from '../store';
import { useTasks } from '../hooks';
import Loading from './loading';
type State = {
  task: {
    entities: Task[];
  };
};
const TaskList = () => {
  // const { tasks } = useContext(ApplicationContext);

  // const tasks = useSelector(
  //   (state: ApplicationStateType) => state.task.entities,
  // );
  const [tasks, loading] = useTasks();
  return (
    <section className="task-list">
      <Loading loading={loading} />
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </section>
  );
};

export default TaskList;
