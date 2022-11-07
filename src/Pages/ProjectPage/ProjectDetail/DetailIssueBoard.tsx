import { Avatar } from 'antd';
import React from 'react'
import SimpleMemberAvatar from '../../../core/Components/Avatar/SimpleMemberAvatar';
import { IProjectDetail } from '../../../core/models/Project/Project.interface';
import { BsFillBookmarkFill } from "react-icons/bs"
import { ITask, ITaskDetailList } from '../../../core/models/Task/Task.Interface';
import clsx from 'clsx';
const DetailIssueBoard = ({ projectDetail }: Partial<IProjectDetail>) => {
    const renderProjectCard = (lstTaskDeTail: ITask[]) => {
        if (lstTaskDeTail.length) {
            return lstTaskDeTail.map((task: ITask, idx: number) => {
                return (
                    <div className={clsx(
                        "card cursor-pointer select-none",
                        "rounded-[3px] bg-white shadow-md",
                        "text-[#172B4D] hover:bg-[#F4F5F7] hover:text-[#172B4D]",
                        "transition-all duration-700"
                    )}>
                        <div className="card-content p-3">
                            <div className="card__title text-sm mb-9">
                                <h6>{task.taskName}</h6>
                            </div>
                            <div className="card__info">
                                <div className="wrapper flex items-center justify-between">
                                    <div className="card__info-col--left flex">
                                        <div className="type">
                                            {task.taskTypeDetail.taskType}
                                        </div>
                                        <div className="priority">
                                            {task.priorityTask.priority}
                                        </div>
                                    </div>
                                    <div className="card__info-col--left">
                                        <div className="member">
                                            <Avatar.Group maxCount={2} size={35}>
                                                <SimpleMemberAvatar members={task.assigness} />
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
        <div className="wrapper project__board flex items-center gap-5">
            {
                projectDetail?.lstTask.map((taskDetailList: ITaskDetailList, idx: number) => {
                    console.log(taskDetailList);

                    return (
                        <div className="col w-1/4 shadow-md" key={idx}>
                            <div className="content-wrapper flex-1 px-2 bg-[#F4F5F7] shadow-md">
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