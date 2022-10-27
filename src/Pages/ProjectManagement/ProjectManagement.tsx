import React, { useEffect, useState, useRef } from "react";

// import redux
import { useAppDispatch } from "../../core/hooks/redux/useRedux";
import { generalActions } from "../../core/redux/slice/generalSlice";

// import local interface
import {
  InterfaceMember,
  InterfaceProject,
} from "../../core/models/Project/Project.interface";

// import Project Service
import PROJECT_SERVICE from "../../core/services/projectServ";

// import antd components
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";

// import antd type
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { InputRef } from "antd";

// import Highlighter component
import Highlighter from "react-highlight-words";
import ProjectEdit from "./ProjectEdit";

export default function ProjectManagement() {
  let dispatch = useAppDispatch();

  const [allProjects, setAllProjects] = useState<
    InterfaceProject[] | undefined
  >(undefined);

  useEffect(() => {
    PROJECT_SERVICE.getAll()
      .then((res) => {
        console.log(res);
        setAllProjects(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditProject = (project: InterfaceProject) => {
    dispatch(
      generalActions.handleDrawerOpen(<ProjectEdit project={project} />)
    );
  };
  const handleDeleteProject = (projectID: number) => {
    PROJECT_SERVICE.delete(projectID)
      .then((res) => {
        console.log(res);
        PROJECT_SERVICE.getAll()
          .then((res) => {
            console.log(res);
            setAllProjects(res.content);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //antd control
  type ProjectIndex = keyof InterfaceProject;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    projectIndex: ProjectIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(projectIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    projectIndex: ProjectIndex
  ): ColumnType<InterfaceProject> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${projectIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, projectIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, projectIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(projectIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[projectIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === projectIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<InterfaceProject> = [
    {
      title: "Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
      ...getColumnSearchProps("projectName"),
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortDirections: ["descend", "ascend"],
      render: (projectName) => (
        <span className="text-lg font-semibold">{projectName}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "20%",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      width: "20%",
      render: (creator) => <Tag color="lime">{creator.name}</Tag>,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      width: "20%",
      render: (members) => {
        return (
          <div className="space-x-2">
            {members.map((member: InterfaceMember) => (
              <span key={member.userId.toString()}>{member.name}</span>
            ))}
          </div>
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, project) => (
        <div className="space-x-1">
          <button
            onClick={() => {
              handleEditProject(project);
            }}
          >
            <FormOutlined className="text-yellow-500 text-xl" />
          </button>
          <button
            onClick={() => {
              handleDeleteProject(project.id);
            }}
          >
            <DeleteOutlined className="text-red-500 text-xl" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={allProjects}
        rowKey={(project) => project.id.toString()}
      />
    </div>
  );
}
