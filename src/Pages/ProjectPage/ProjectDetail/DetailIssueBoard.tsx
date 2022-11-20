import clsx from 'clsx';

/* import and component */
import { Avatar } from 'antd';

/* import local components */
import SimpleMemberAvatar from '../../../core/Components/Avatar/SimpleMemberAvatar';

/* import local interfaces */
import { IProjectDetail } from '../../../core/models/Project/Project.interface';
import { ITask, ITaskDetailList } from '../../../core/models/Task/Task.Interface';

import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux/useRedux';
import { modalActions } from '../../../core/redux/slice/modalSlice';
import EditTask from './Task/EditTask';
import EditTaskHeader from './Task/EditTaskHeader';


const DetailIssueBoard = ({ project }: IProjectDetail) => {
    let dispatch = useAppDispatch();
    let modalProps = useAppSelector(state => state.modalReducer.modalProps);
    const handleEditTask = (task: ITask) => {
        dispatch(modalActions.setUpModal({ ...modalProps, width: 1000, headerContent: <EditTaskHeader /> }));
        dispatch(modalActions.openModal(<EditTask task={task} project={project} />));
    };
    const renderProjectCard = (lstTaskDeTail: ITask[]) => {
        if (lstTaskDeTail.length) {
            return lstTaskDeTail.map((taskDetail: ITask, idx: number) => {
                return (
                    <div className={clsx(
                        "card cursor-pointer select-none",
                        "rounded-[3px] bg-white card-task-shadow",
                        "text-[#172B4D] hover:bg-[#F4F5F7] hover:text-[#172B4D]",
                        "transition-all duration-700"
                    )} key={taskDetail.taskId.toString() + idx} onClick={() => { handleEditTask(taskDetail) }} >
                        <div className="card-content p-3">
                            <div className="card__title text-sm mb-9">
                                <h6>{taskDetail.taskName}</h6>
                            </div>
                            <div className="card__info">
                                <div className="wrapper flex items-center justify-between">
                                    <div className="card__info-col--left flex">
                                        <div className="type">
                                            {taskDetail.taskTypeDetail.taskType}
                                        </div>
                                        <div className="priority">
                                            {taskDetail.priorityTask.priority}
                                        </div>
                                    </div>
                                    <div className="card__info-col--left">
                                        <div className="member">
                                            <Avatar.Group size={30}>
                                                <SimpleMemberAvatar members={taskDetail.assigness} />
                                            </Avatar.Group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    const projectBoard = (
        <div className="wrapper project__board flex items-stretch gap-5">
            {
                project?.lstTask.map((taskDetailList: ITaskDetailList, idx: number) => {
                    return (
                        <div className="col w-1/4 shadow-md" key={taskDetailList.statusId.toString() + idx}>
                            <div className="content-wrapper flex-1 px-2 bg-[#F4F5F7] shadow-md h-full">
                                <div className="content">
                                    <div className="header relative h-[40px] py-3 pl-2">
                                        <div className="title-wrapper h-full rounded-tl-md rounded-tr-md">
                                            <h2 className="title m-0 flex items-center gap-2 text-[#5E6C84] text-xs font-medium uppercase">
                                                <p className="text m-0">{taskDetailList.statusName}</p>
                                                <span className="task-count">{taskDetailList.lstTaskDeTail.length} issues</span>
                                            </h2>
                                        </div>
                                        <div className="icon-wrapper"></div>
                                    </div>
                                    <div className="card__list-container min-h-[80px] pb-3 max-w-full truncate">
                                        <div className="wrapper px-2 pt-2 flex flex-col gap-4">
                                            {renderProjectCard(taskDetailList.lstTaskDeTail)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
    return (
        <>{projectBoard}</>
    )
}

export default DetailIssueBoard