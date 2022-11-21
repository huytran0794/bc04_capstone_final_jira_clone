import { useState, useRef } from 'react';

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
import { DropwDownIcons } from '../../../core/utils/TaskIcons/Dropdown';


const DetailIssueBoard = ({ project }: IProjectDetail) => {
    let dispatch = useAppDispatch();
    let modalProps = useAppSelector((state) => state.modalReducer.modalProps);
    let taskTypeIcons = DropwDownIcons.taskType;
    let taskStatusIcons = DropwDownIcons.status;
    const handleEditTask = (task: ITask) => {
        dispatch(modalActions.setUpModal({ ...modalProps, width: 1000, headerContent: <EditTaskHeader /> }));
        dispatch(modalActions.openModal(<EditTask task={task} project={project} />));
    };

    // to store the current item we're dragging
    let [taskList, setTaskList] = useState<ITask[]>([]);
    project?.lstTask.map((taskDetailList: ITaskDetailList, idx: number) => {
        setTaskList([...taskDetailList.lstTaskDeTail]);
    });
    let cardDrag = useRef<ITask>();

    const handleDragDropCard = (e: React.DragEvent<HTMLDivElement>, taskDrag: ITask, idx: number) => {
        // console.log('ham drag n drop issue');
        // console.log(e.target);
        // console.log(task);
        // console.log(idx);

        // save the current card data
        cardDrag.current = taskDrag;
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, taskDragEnter: ITask, idx: number) => {
        // console.log('ham handleDragEnter');
        // console.log(e.target);
        // console.log(taskDragEnter);
        // console.log(idx);

        // get list of task
        let taskListUpdate: ITask[] = [...taskList];
        console.log("taskListUpdate");
        console.log(taskListUpdate);

        // index card dang keo
        let idxTagDrag = taskListUpdate.findIndex(task => task.taskId === cardDrag.current?.taskId);

        // index card bi keo
        let idxTagDragEnter = taskListUpdate.findIndex(task => task.taskId === taskDragEnter.taskId);

        console.log('gia tri truoc khi swap');
        console.log('thang keo')
        console.log(taskListUpdate[idxTagDrag]);

        console.log('thang bi keo qua')
        console.log(taskListUpdate[idxTagDragEnter]);

        // swap
        let temp = taskListUpdate[idxTagDrag];
        taskListUpdate[idxTagDrag] = taskListUpdate[idxTagDragEnter];
        taskListUpdate[idxTagDragEnter] = temp;

        console.log('gia tri sau khi swap');
        console.log('thang keo')
        console.log(taskListUpdate[idxTagDrag]);

        console.log('thang bi keo qua')
        console.log(taskListUpdate[idxTagDragEnter]);

        // setTaskList(taskListUpdate);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, name: string, idx: number) => {
        console.log('noi ma the dang duoc keo qua');
        console.log(e.target);
        console.log(name)
        console.log(idx);
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("handleDragEnd", e.target)
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("handleDrop", e.target)
    }

    const renderProjectCard = (lstTaskDeTail: ITask[]) => {
        if (lstTaskDeTail.length) {
            return lstTaskDeTail.map((taskDetail: ITask, idx: number) => {
                return (
                    <div className={clsx(
                        "card ",
                        "rounded-[3px] bg-white hover:shadow-md border border-solid ",
                        "text-[#172B4D] hover:bg-[#F4F5F7] hover:text-[#172B4D]",
                        "transition-all duration-700"
                    )}
                        draggable={true}
                        key={taskDetail.taskId.toString() + idx}
                        // onClick={() => { handleEditTask(taskDetail) }}
                        onDragStart={(e) => { handleDragDropCard(e, taskDetail, idx) }}
                        onDragEnter={(e) => { handleDragEnter(e, taskDetail, idx) }}

                    >
                        <div className="card-content p-3">
                            <div className="card__title text-sm mb-9">
                                <h6>{taskDetail.taskName}</h6>
                            </div>
                            <div className="card__info">
                                <div className="wrapper flex items-center justify-between">
                                    <div className="card__info-col--left flex items-center gap-2">
                                        <div className="type flex items-center gap-2">
                                            <span className="icon">
                                                {taskTypeIcons[taskDetail.taskTypeDetail.taskType]}
                                            </span>


                                        </div>
                                        <div className="priority flex items-center gap-1">
                                            <span className="icon flex items-center">
                                                {taskStatusIcons[taskDetail.priorityTask.priority!.toLowerCase()]}
                                            </span>
                                            <span className="txt">{taskDetail.priorityTask.priority}</span>

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
                        <div className="col w-1/4 shadow-md" key={taskDetailList.statusId.toString() + idx} draggable={true}
                            // onDragOver={
                            //     (e) => handleDragOver(e, taskDetailList.statusName, idx)
                            // }
                            onDrop={handleDrop}
                        >
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