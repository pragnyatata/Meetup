import React, { Component } from "react";
import { getMeetings } from "../services/user";
import { getCurrentUser } from "../services/auth";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

class HostVisitors extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    meetings: []
  };
  async componentDidMount() {
    const currentHost = await getCurrentUser();

    const meetings = await getMeetings(currentHost);
    // console.log(meetings.data);
    this.setState({ meetings: meetings.data });
    this.setCheckin();
    console.log(this.state.meetings);
  }
  setCheckin = () => {
    const meetings = [...this.state.meetings];
    meetings.forEach(function(element) {
      element.datein =
        element.checkin.date +
        "|" +
        element.checkin.month +
        "|" +
        element.checkin.year;
      element.timein = element.checkin.hours + ":" + element.checkin.minutes;
      if (element.checkout) {
        element.dateout =
          element.checkout.date +
          "|" +
          element.checkout.month +
          "|" +
          element.checkout.year;
        element.timeout =
          element.checkout.hours + ":" + element.checkout.minutes;
      }
    });

    this.setState({ meetings });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const { meetings } = this.state;
    if (meetings.length === 0) return <h1>No meetings yet</h1>;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        ...this.getColumnSearchProps("contact")
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Checkin-Date",
        dataIndex: "datein",
        key: "datein",
        ...this.getColumnSearchProps("datein")
      },
      {
        title: "Timein",
        dataIndex: "timein",
        key: "timein",
        ...this.getColumnSearchProps("timein")
      },
      {
        title: "Checkout-Date",
        dataIndex: "dateout",
        key: "dateout",
        ...this.getColumnSearchProps("dateout")
      },
      {
        title: "Timeout",
        dataIndex: "timeout",
        key: "timeout",
        ...this.getColumnSearchProps("timeout")
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={meetings}
        style={{ backgroundColor: "white" }}
      />
    );
  }
}

export default HostVisitors;
