import React, { useCallback, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Table, Box } from "gestalt";
import Dropzone from "./Dropzone";
import { showConfirmDialog } from "../../utils/showConfirmDialog";
import { IndexContext } from "../../App";

const file2form = (name) => (file) => {
  let formData = new FormData();
  formData.append(name, file, `${name}.csv`);
  return formData;
};

const TableWrapper = styled.div`
  margin-top: 50px;
  tr:nth-child(even) {
    background: #cfcfcf;
  }
`;

const DisplayDemands = ({ demands, max }) => {
  return (
    <TableWrapper>
      <Table>
        <Table.Body>
          {(demands || []).map((row, i) => (
            <Table.Row>
              <Table.Cell>#{i + 1}</Table.Cell>
              {console.log(demands.length)}
              {row.map((col) => (
                <Table.Cell>{col}</Table.Cell>
              ))}
              {(i % 4 === 0) && <Table.Cell>max: {max[Math.floor(i / 4)]}</Table.Cell>}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};
const Uploader = (props) => {
  const { possibleDemands, possibleMax } = useContext(IndexContext);
  const onDrop = useCallback(
    (name) => (acceptedFiles) => {
      acceptedFiles.forEach(async (file) => {
        const formData = file2form(name)(file);
        await axios.post("/api/demands", formData);
        showConfirmDialog({
          heading: "Uploaded successfully",
          content: `Uploaded ${name}.csv to server`,
        });
      });
    },
    []
  );

  return (
    <>
      <Dropzone onDrop={onDrop("demands")} text="Upload request form" />
      <Dropzone onDrop={onDrop("max")} text="Upload the possible maximum possible revenue statement" />
      <DisplayDemands demands={possibleDemands} max={possibleMax} />
    </>
  );
};

export default Uploader;
