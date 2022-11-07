import { Avatar } from 'antd';
import { InterfaceProject } from '../../models/Project/Project.interface'

const SimpleMemberAvatar = ({ members }: Partial<InterfaceProject>) => {
    const renderAvatar = () => {
        if (members) {
            return members?.map((member, idx) => (
                <Avatar src={member.avatar} key={member.userId!.toString() + idx} />
            ))
        }
        return null;
    }

    return <>{renderAvatar()}</>
}
export default SimpleMemberAvatar;