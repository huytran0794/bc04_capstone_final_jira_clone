/* import antd components */
import { Avatar, Button, Form, Input, InputNumber, Select, SelectProps, Slider } from "antd";
import { useState, useEffect } from "react";
import { BsCheckSquareFill, BsExclamationSquareFill } from "react-icons/bs";


/* import redux hooks */
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/useRedux";
import { getAllInfoThunk, getTaskUsersThunk } from "../../../redux/slice/taskSlice";

/* import local interfaces */
import { ITaskForm } from "../../../models/common/FormProps.interface";
import { ITask } from "../../../models/Task/Task.Interface";


import PROJECT_SERVICE from "../../../services/projectServ";
import CustomEditor from "../../tinyEditor/CustomEditor";

/* import local components */
import Label from "../Label/Label";
import { modalActions } from "../../../redux/slice/modalSlice";

import clsx from "clsx";



const CreateTaskForm = ({
    layout = "horizontal",
    size = "large",
    project,
    buttonText = "Submit",
    handleOnFinish,
}: ITaskForm) => {
    console.log("Current Project info", project);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const { Option } = Select;
    const onFinish = (values: ITask) => {
        handleOnFinish(values);
    };

    const labelItem = (labelText: string) => (
        <Label className="text-sm font-medium text-pickled-bluewood-400 capitalize">
            {labelText}
        </Label>
    );
    const projectList = useAppSelector(
        (state) => state.projectReducer.projectList
    );

    // fetch value for form dropdown
    useEffect(() => {
        dispatch(getAllInfoThunk());
        dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
    }, [dispatch]);

    const [projectId, setProjectId] = useState<number>(project?.id || -1);


    if (!project && projectList && projectList.length > 0 && projectId === -1) {
        setProjectId(projectList[0].id);
    }


    useEffect(() => {
        if (projectId > -1) {
            dispatch(getTaskUsersThunk(projectId));
        }
    }, [projectId]);


    let { taskTypeList, taskStatusList, taskPriorityList, taskUserList } = useAppSelector(
        (state) => state.taskReducer
    );
    let assigneesOptions: SelectProps['options'] = [];
    if (taskUserList.length > 0) {
        assigneesOptions = taskUserList?.map((user, idx) => {
            let label = (
                <div className={clsx(`user-${user.name}`, "flex items-center gap-3")}>
                    <div className="avatar">
                        <Avatar size={30} src={user.avatar} key={(Math.floor(Math.random() * 100) + 1).toString() + idx} />
                    </div>
                    <p className="text mb-0">{user.name}</p>
                </div>
            );

            return { label: label, value: user.userId }
        });
    }
    // setup initial value for form when edit or create a task
    const getInitialValue = () => {
        let returnedValue = {
            taskName: "",
            typeId: taskTypeList[0].id,
            priorityId: taskPriorityList[0].priorityId,
            statusId: taskStatusList[0].statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            timeTracking: 0,
            listUserAsign: [],
            description: "",
            projectId: projectId,
        };
        return returnedValue;
    };

    let initialValues = getInitialValue();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    const handleProjectChange = (value: string) => {
        setProjectId(Number(value));
    }


    const onValuesChange = (changedValues: any, values: any) => {
        values.timeTracking = values.timeTrackingSpent;

        form.setFieldsValue(values);

        console.log("values");
        console.log(values);
    }
    const formProps = { form, layout, size, onFinish, onValuesChange };
    return (
        <Form name="create-task-form" className="myform projectForm" {...formProps}>
            <Form.Item name="taskName"
                rules={[
                    {
                        required: true,
                        message: "Please do not leave ${name} empty",
                    },
                    { max: 80, message: "Project name can't extend 80 characters." },
                ]}
                label={labelItem("name")}
            >
                <Input
                    placeholder="My project..."
                    className="py-2 px-5 rounded-md"
                    name="taskNameInput"
                />
            </Form.Item>
            <Form.Item name="projectId" label={labelItem("project name")}>
                <Select className="select-project rounded-md" onChange={handleProjectChange}>
                    {projectList?.map((project, idx) => <Option key={project.id.toString() + idx} value={project.id} id={project.id.toString()}>{project.projectName}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="statusId" label={labelItem("Status Type")}>
                <Select className="select-task-status">
                    {taskStatusList?.map((taskStatus, idx) => <Option key={taskStatus.statusId.toString() + idx} value={taskStatus.statusId}>{taskStatus.statusName}</Option>)}
                </Select>
            </Form.Item>
            <div className="form-row flex items-center gap-5">
                <div className="form-item-wrapper w-1/2">
                    <Form.Item name="priorityId" label={labelItem("priority")}>
                        <Select className="select-task-priority">
                            {taskPriorityList?.map((taskPriority, idx) => {
                                return (
                                    <Option key={taskPriority.priorityId.toString() + idx} value={taskPriority.priorityId}>
                                        <div className="option-label-item capitalize flex items-center gap-4">
                                            <span role="img" aria-label={taskPriority.priority}>
                                            </span>
                                            {taskPriority.priority}
                                        </div>
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </div>
                <div className="form-item-wrapper w-1/2">
                    <Form.Item name="typeId" label={labelItem("Issue Type")}>
                        <Select className="select-task-type">
                            {taskTypeList?.map((taskType, idx) => {
                                return (
                                    <Option key={taskType.id.toString() + idx} value={taskType.id}>
                                        <div className="option-label-item capitalize flex items-center gap-4">
                                            <span className='icon'>
                                                {taskType.taskType.toLowerCase() === "new task" ? <BsCheckSquareFill /> : <BsExclamationSquareFill />}
                                            </span>
                                            <span className="txt">{taskType.taskType}</span>
                                        </div>
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <div className="form-row flex items-center gap-5">
                <div className="form-item-wrapper w-1/2">
                    <Form.Item name="listUserAsign" label={labelItem("assignees")}>
                        <Select className="select-listUserAsign" mode="multiple" optionFilterProp="label" placeholder="Select assignees" options={assigneesOptions} />
                    </Form.Item>
                </div>


                <div className="form-item-wrapper time-tracking-input-wrapper w-1/2">
                    <Form.Item noStyle >
                        <Form.Item name="timeTracking" label={labelItem("time tracking")}>
                            <Slider
                                value={Number(form.getFieldValue('timeTracking'))}
                                max={Number(form.getFieldValue('timeTrackingSpent')) + Number(form.getFieldValue('timeTrackingRemaining'))}
                                disabled={true}
                                tooltip={{ open: false }}
                                trackStyle={{ backgroundColor: "#0052cc", height: "7px", borderRadius: "4px" }}
                                handleStyle={{ display: "none" }}
                                className="timeTrackingSlider"
                            />
                        </Form.Item>
                        <div className="time-logged flex items-center justify-between">
                            <div className="time-spent-logged font-bold">
                                <span className="time-text">{form.getFieldValue('timeTrackingSpent')}</span>
                                <span>h logged</span>
                            </div>
                            <div className="time-remain-logged font-bold">
                                <span className="time-text">{form.getFieldValue('timeTrackingRemaining')}</span>
                                <span>h remaining</span>
                            </div>
                        </div>
                    </Form.Item>

                </div>

            </div>
            <div className="form-row flex items-center gap-5">
                <div className="form-item-wrapper w-1/2">
                    <Form.Item name="originalEstimate" label={labelItem("originalEstimate")}>
                        <Input
                            placeholder="0"
                            className="py-2 px-5 rounded-md"
                            name="originalEstimateInput"
                        />
                    </Form.Item>
                </div>

                <div className="form-inner-wrapper flex items-center gap-3 w-1/2">
                    <div className="form-item-wrapper w-1/2">
                        <Form.Item name="timeTrackingSpent" label={labelItem("time spent (hours)")} rules={[
                            { type: 'number', min: 0 },
                        ]}>
                            <InputNumber
                                placeholder="0"
                                className="rounded-md"
                                name="timeTrackingSpentInput"
                                min={0}
                            />
                        </Form.Item>
                    </div>

                    <div className="form-item-wrapper w-1/2">
                        <Form.Item name="timeTrackingRemaining" label={labelItem("time remaining (hours)")} dependencies={["timeTrackingSpent"]} rules={[
                            { type: 'number', min: 0 },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    let timeSpent = getFieldValue('timeTrackingSpent');
                                    let condition = value >= 0 && timeSpent >= 0 && getFieldValue('timeTrackingSpent') <= value;
                                    // console.log("*******************************");
                                    // console.log("value");
                                    // console.log(value);
                                    // console.log("getFieldValue('timeTrackingSpent')");
                                    // console.log(getFieldValue('timeTrackingSpent'));
                                    // console.log('condition');
                                    // console.log(condition);
                                    // console.log("*******************************");
                                    if (condition) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Time tracking remaining can't be smaller than time trackingspent"));
                                },
                            }),
                        ]}>
                            <InputNumber
                                placeholder="0"
                                className="rounded-md"
                                name="timeTrackingRemainingInput"
                                min={0}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <Form.Item name="description" label={labelItem("description")}>
                <CustomEditor formInstance={form} />
            </Form.Item>
            <Form.Item className="form-btn-group">
                <Button
                    htmlType="button"
                    className="btn-cancel btn-txt--underlined border-none text-[#6B778C] text-base order-1"
                    onClick={() => { dispatch(modalActions.closeModal()); }}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-login bg-science-blue-500 text-white border-none rounded-[4px] hover:bg-[#0065ff] font-semibold text-base capitalize transition-all duration-[400ms] order-2"
                >
                    {buttonText}
                </Button>
            </Form.Item>
        </Form >
    );
}

export default CreateTaskForm;