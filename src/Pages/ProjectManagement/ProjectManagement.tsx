import React, { useEffect, useState, useRef } from "react";

// import local interface
import { InterfaceProject } from "../../core/models/Project/Project.interface";

// import local components
import ProjectActionButtons from "./ProjectActionButtons";
import ProjectMembers from "./ProjectMembers";

// import local Services
import PROJECT_SERVICE from "../../core/services/projectServ";

// import antd type
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { InputRef } from "antd";

// import antd components
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";

// import Highlighter component
import Highlighter from "react-highlight-words";
import {
  useAppDispatch,
  useAppSelector,
} from "../../core/hooks/redux/useRedux";

export default function ProjectManagement() {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector(
    (state) => state.projectReducer.projectList
  );

  const [allProjects, setAllProjects] = useState<
    InterfaceProject[] | undefined
  >(undefined);

  useEffect(() => {
    dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
  }, []);

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
      sorter: (a, b) => b.projectName.localeCompare(a.projectName),
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
      render: (members, project) => (
        <ProjectMembers projectID={project.id} members={members} />
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, project) => <ProjectActionButtons project={project} />,
    },
  ];
  console.log("rendered");
  return (
    <div>
      <Table
        columns={columns}
        dataSource={projectList}
        rowKey={(project) => project.id.toString()}
      />
    </div>
  );
}
