import ToggleableTimerForm from "./ToggleableTimerForm";
import { BeatLoader } from 'react-spinners'
import TimerController from "./TimerController";
import useFetch from "../../hooks/useFetch";

const TimerList = () => {
    const { error, loading, timerList } = useFetch();
    return (
        <>
            {loading ? <div className="loader"><BeatLoader size={60} /></div> :
                <div className="timerlist column">
                    <ul className="row timerGrid">
                        {timerList.map(timer => {
                            return (<TimerController timer={timer} key={timer.id} />)
                        })}
                        <ToggleableTimerForm />
                    </ul>
                </div>
            }
        </>
    );
}

export default TimerList;