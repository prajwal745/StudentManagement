import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Table from "../components/Table";
import axios from "axios";

const DataListing = ({ apiRoute, type, inputColumns }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const removeFromState = (id) => {
    const filterData = data.filter((eachData) => eachData[`${type}_id`] !== id);
    setData([...filterData]);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/${type}`)
      .then(({ data }) => {
        setData(data?.data);
      })
      .catch((err) => {
        console.log("Error fetching students", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (data) => {
    setDeleteLoading(true);
    const id = data?.[`${type}_id`];
    try {
      const data = await axios.delete(`/api/${type}/${id}`);
      removeFromState(id);
    } catch (error) {
      console.log(`Error deleting ${type}`, error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Spin
      spinning={loading || deleteLoading}
      tip={loading ? `Fetching ${type} list` : `Deleting ${type} from database`}
      delay={500}
    >
      <Table
        dataSource={data}
        handleDelete={handleDelete}
        inputColumns={inputColumns}
      />
    </Spin>
  );
};

export default DataListing;
