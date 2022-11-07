import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { InterfaceProject } from "../../../core/models/Project/Project.interface";
const DetailHeader = ({ members }: Partial<InterfaceProject>) => {
    const renderMember = () => {
        if (members) {
            return members?.map((member, idx) => (
                <Avatar src={member.avatar} key={member.userId!.toString() + idx} />
            ))
        }
        return null;
    }

    const projectBoardFilter = (
        <div className="project__board-filter mb-4 flex items-center gap-4">
            <div className="search-bar relative">
                <input className="search-input border border-black pl-5 py-2" type='text' name='filter-task-search' id="filter-task-search" />
                <SearchOutlined className="absolute top-1/2 left-2 z-[1px] -translate-y-1/2" />
            </div>
            <div className="member">
                {renderMember()}
            </div>
        </div>
    );
    return (
        <>{projectBoardFilter}</>
    )
}

export default DetailHeader